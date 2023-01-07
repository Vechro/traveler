import { dedupeMixin, type Constructor } from "@open-wc/dedupe-mixin";
import type { GoTrueClient, User } from "@supabase/gotrue-js";
import type { PostgrestClient } from "@supabase/postgrest-js";
import type { LitElement } from "lit";
import type { Database } from "&/database";
import { getAuth, getPostgrestWithSession } from "&/utilities/api";

export declare class RestMixinInterface {
  auth: GoTrueClient;
  user: Promise<User>;
  rest: Promise<PostgrestClient<Database>>;
}

export const RestMixin = dedupeMixin(<T extends Constructor<LitElement>>(superClass: T) => {
  class Rest extends superClass {
    auth: RestMixinInterface["auth"] = getAuth();
    user: RestMixinInterface["user"] = this.auth.getUser().then(({ data, error }) => {
      if (error) {
        throw new Error("Failed to get user.");
      }
      return data.user;
    });
    rest: RestMixinInterface["rest"] = this.auth.getSession().then(({ data, error }) => {
      if (error || !data.session) {
        throw new Error("Failed to get session.");
      }
      return getPostgrestWithSession(data.session);
    });
  }

  return Rest as Constructor<RestMixinInterface> & T;
});
