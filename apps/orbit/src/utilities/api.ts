import type { Database } from "&/database";
import { GoTrueClient } from "@supabase/gotrue-js";
import { PostgrestClient } from "@supabase/postgrest-js";

const host = location.protocol + "//" + location.host;

export class Api {
  static auth: GoTrueClient;
  static rest: Promise<PostgrestClient<Database>>;

  static {
    this.auth = new GoTrueClient({
      url: `${host}/auth/v1`,
      headers: {
        Accept: "application/json",
        apikey: import.meta.env.PUBLIC_ANON_KEY,
      },
    });

    this.rest = new Promise<PostgrestClient<Database>>((resolve, reject) => {
      this.auth.getSession().then(({ data, error }) => {
        if (error || !data.session) {
          return reject("Failed to get session.");
        }
        resolve(
          new PostgrestClient<Database>(`${host}/rest/v1`, {
            headers: { Authorization: `Bearer ${data.session.access_token}`, apikey: import.meta.env.PUBLIC_ANON_KEY },
          })
        );
      });
    });
  }

  constructor() {
    if (this instanceof Api) {
      throw Error("A static class cannot be instantiated.");
    }
  }
}
