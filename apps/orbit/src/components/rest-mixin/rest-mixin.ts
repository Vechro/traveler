import { dedupeMixin, type Constructor } from "@open-wc/dedupe-mixin";
import type { GoTrueClient, User } from "@supabase/gotrue-js";
import type { PostgrestClient } from "@supabase/postgrest-js";
import type { LitElement } from "lit";
import type { Database } from "~/database";
import { getAuth, getPostgrestWithSession } from "~/utilities/api";

export declare class RestMixinInterface {
  auth: GoTrueClient;
  user: User;
  rest: PostgrestClient<Database>;
}

export const RestMixin = dedupeMixin(<T extends Constructor<LitElement>>(superClass: T) => {
  class Rest extends superClass {
    auth: RestMixinInterface['auth'] = getAuth();
    user!: RestMixinInterface['user'];
    rest!: RestMixinInterface['rest'];

    override connectedCallback = async () => {
      super.connectedCallback();
      const {
        data: { user, session },
        error,
      } = await this.auth.refreshSession();

      if (error || !user || !session) {
        throw new Error("Failed to refresh session.");
      }

      this.user = user;
      this.rest = getPostgrestWithSession(session);
    };
  }

  return Rest as Constructor<RestMixinInterface> & T;
});
