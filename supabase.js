const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// Use your actual Supabase project credentials (keep serviceRoleKey secret!)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

module.exports = { supabase };
