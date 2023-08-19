import type { Database } from "&/database";
import { Api } from "&/utilities/api";
import { dedupeMixin, type Constructor } from "@open-wc/dedupe-mixin";
import type { User } from "@supabase/gotrue-js";
import type { PostgrestClient } from "@supabase/postgrest-js";
import type { LitElement } from "lit";

export declare class RestMixinInterface {
  user: Promise<User>;
  rest: Promise<PostgrestClient<Database>>;
}

export const RestMixin = dedupeMixin(<T extends Constructor<LitElement>>(superClass: T) => {
  class Rest extends superClass {
    user: RestMixinInterface["user"] = Api.auth.getUser().then(({ data, error }) => {
      if (error) {
        throw new Error("Failed to get user.");
      }
      return data.user;
    });
    rest: RestMixinInterface["rest"] = Api.rest;
  }

  return Rest as Constructor<RestMixinInterface> & T;
});
