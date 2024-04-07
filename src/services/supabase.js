import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tptitpuxqcgpldtdyjzm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdGl0cHV4cWNncGxkdGR5anptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzNjAyMTgsImV4cCI6MjAyNzkzNjIxOH0.C6Lc-R_rl3n6Wz3X1NDroujZPnDrRG-nxQTL6IK6K9Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
