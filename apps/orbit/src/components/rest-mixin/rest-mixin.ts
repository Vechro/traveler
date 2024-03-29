import type { Database } from "src/database";
import { Api } from "src/utilities/api";
import { dedupeMixin } from "@open-wc/dedupe-mixin";
import type { User } from "@supabase/gotrue-js";
import type { PostgrestClient } from "@supabase/postgrest-js";
import type { LitElement } from "lit";

export type Constructor<T> = new (...args: any[]) => T;

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
