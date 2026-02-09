export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    topics: string[];
    language: string | null;
    stargazers_count: number;
    readme_summary?: string;
    default_branch: string;
    full_name: string;
    fork: boolean;
}

async function fetchReadme(full_name: string, default_branch: string = 'main'): Promise<string | null> {
    try {
        const urls = [
            `https://raw.githubusercontent.com/${full_name}/${default_branch}/README.md`,
            `https://raw.githubusercontent.com/${full_name}/${default_branch}/readme.md`,
            `https://raw.githubusercontent.com/${full_name}/master/README.md`,
            `https://raw.githubusercontent.com/${full_name}/master/readme.md`
        ];

        for (const url of urls) {
            const res = await fetch(url, { next: { revalidate: 3600 } });
            if (res.ok) {
                return await res.text();
            }
        }
        return null;
    } catch (e) {
        console.error(`Error fetching README for ${full_name}:`, e);
        return null;
    }
}

function parseReadme(content: string): string | null {
    if (!content) return null;

    // Remove markdown headers
    let text = content.replace(/^#+\s+(.*)$/gm, '');

    // Remove images/badges [! [...](...)]
    text = text.replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, ''); // Linked images
    text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, ''); // Images

    // Remove HTML tags
    text = text.replace(/<[^>]*>/g, '');

    // Split by newlines and find the first substantial paragraph
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    for (const line of lines) {
        // Skip lines that look like badges or very short titles
        if (line.length > 40 && !line.startsWith('[') && !line.startsWith('|')) {
            return line;
        }
    }

    return lines[0] || null;
}

export async function getOrganizationRepos(orgName: string = "zetalabs-in"): Promise<GitHubRepo[]> {
    try {
        // Revalidate 3600 (1 hour)
        // Using type=owner to prefer source repositories
        const res = await fetch(`https://api.github.com/users/${orgName}/repos?sort=pushed&per_page=100&type=owner`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            console.error("Failed to fetch repos:", res.statusText);
            return [];
        }

        const allRepos: GitHubRepo[] = await res.json();

        // Strict Filtering:
        // 1. Must not be a fork
        // 2. Full name must start with the organization name (case-insensitive check for safety)
        const repos = allRepos.filter(repo => {
            const isFork = repo.fork;
            const belongsToOrg = repo.full_name.toLowerCase().startsWith(`${orgName.toLowerCase()}/`);
            return !isFork && belongsToOrg;
        });

        // Fetch READMEs in parallel
        const reposWithReadmes = await Promise.all(repos.map(async (repo) => {
            const readmeContent = await fetchReadme(repo.full_name, repo.default_branch);
            const summary = readmeContent ? parseReadme(readmeContent) : null;
            return {
                ...repo,
                readme_summary: summary || undefined
            };
        }));

        return reposWithReadmes;
    } catch (error) {
        console.error("Error fetching repos:", error);
        return [];
    }
}
