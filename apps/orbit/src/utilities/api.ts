import { GoTrueClient, type Session } from "@supabase/gotrue-js";
import { PostgrestClient } from "@supabase/postgrest-js";
import type { Database } from "&/database";

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

export const getPostgrest = (options?: ConstructorParameters<typeof PostgrestClient>[1]) =>
  new PostgrestClient<Database>(`${API_URL}/rest/v1`, options);

export const getPostgrestWithSession = ({ access_token }: Session) =>
  getPostgrest({ headers: { Authorization: `Bearer ${access_token}` } });
