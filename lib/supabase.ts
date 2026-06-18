import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wjsgcmjgujkmedymjjxi.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "sb_publishable_a64Ek_zM03ASOHgHgzPllg_O-cmKWKM";

export const supabase = createClient(supabaseUrl, supabaseKey);
