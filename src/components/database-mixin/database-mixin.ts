import { Constructor, dedupeMixin } from "@open-wc/dedupe-mixin";
import { IDBPDatabase, openDB } from "idb";
import { LitElement } from "lit";

export declare class DatabaseMixinInterface {
  database?: Promise<IDBPDatabase<unknown>>;
}

export const DatabaseMixin = dedupeMixin(
  <T extends Constructor<LitElement>>(superClass: T) => {
    class Database extends superClass {
      database?: Promise<IDBPDatabase<unknown>>;

      // https://github.com/microsoft/TypeScript/issues/37142
      constructor(..._: any[]) {
        super();
        this.database = openDB("globe", 2, {
          upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore("markers", {
              // The 'id' property of the object will be the key.
              keyPath: "id",
              // If it isn't explicitly set, create a value by auto incrementing.
              autoIncrement: true,
            });
            store.createIndex("id", "id");
          },
        });
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        this.database?.then((db) => db.close());
      }
    }

    return Database as Constructor<DatabaseMixinInterface> & T;
  }
);
