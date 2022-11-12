import { GoTrueClient } from "@supabase/gotrue-js";
import { PostgrestClient } from "@supabase/postgrest-js";

const API_URL = "http://localhost:9080";
const API_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

export const getAuth = () =>
  new GoTrueClient({
    url: `${API_URL}/auth/v1`,
    headers: {
      accept: "json",
      apikey: API_ANON,
    },
  });

export const getPostgrest = () => new PostgrestClient(`${API_URL}/rest/v1`);
