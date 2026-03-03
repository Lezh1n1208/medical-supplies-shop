import { createClient } from "@supabase/supabase-js";
import { requiredEnv } from "../env";

export const supabase = createClient(
  requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
);
