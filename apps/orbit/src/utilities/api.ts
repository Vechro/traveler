import { GoTrueClient, type Session } from "@supabase/gotrue-js";
import { PostgrestClient } from "@supabase/postgrest-js";
import type { Database } from "&/database";

const API_URL = "http://localhost:9080";

export const getAuth = () =>
  new GoTrueClient({
    url: `${API_URL}/auth/v1`,
    headers: {
      Accept: "application/json",
      apikey: import.meta.env.PUBLIC_ANON_KEY,
    },
  });

export const getPostgrest = (options?: ConstructorParameters<typeof PostgrestClient>[1]) =>
  new PostgrestClient<Database>(`${API_URL}/rest/v1`, options);

export const getPostgrestWithSession = ({ access_token }: Session) =>
  getPostgrest({ headers: { Authorization: `Bearer ${access_token}`, apikey: import.meta.env.PUBLIC_ANON_KEY } });
