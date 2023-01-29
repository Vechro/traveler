import { GoTrueClient, type Session } from "@supabase/gotrue-js";
import { PostgrestClient } from "@supabase/postgrest-js";
import type { Database } from "&/database";

const API_URL = "http://localhost:9080";
const API_ANON = "anon-key";

export const getAuth = () =>
  new GoTrueClient({
    url: `${API_URL}/auth/v1`,
    headers: {
      Accept: "application/json",
      apikey: API_ANON,
    },
  });

export const getPostgrest = (options?: ConstructorParameters<typeof PostgrestClient>[1]) =>
  new PostgrestClient<Database>(`${API_URL}/rest/v1`, options);

export const getPostgrestWithSession = ({ access_token }: Session) =>
  getPostgrest({ headers: { Authorization: `Bearer ${access_token}`, apikey: API_ANON } });
