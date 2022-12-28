import { Constructor, dedupeMixin } from "@open-wc/dedupe-mixin";
import { DBSchema, IDBPDatabase, openDB } from "idb";
import type { LitElement } from "lit";
import type { Vector3 } from "three";

export interface Marker {
  id: string;
  name: string;
  position: Vector3;
}

export interface GlobeViewerSchema extends DBSchema {
  markers: {
    key: Marker["id"];
    value: Marker;
    indexes: {
      id: "id";
    };
  };
}

export declare class DatabaseMixinInterface {
  database?: Promise<IDBPDatabase<GlobeViewerSchema>>;
}

export const DatabaseMixin = dedupeMixin(<T extends Constructor<LitElement>>(superClass: T) => {
  class Database extends superClass {
    database?: Promise<IDBPDatabase<GlobeViewerSchema>>;

    // https://github.com/microsoft/TypeScript/issues/37142
    constructor(..._: any[]) {
      super();
      this.database = openDB<GlobeViewerSchema>("globe", 2, {
        upgrade(db) {
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

    override disconnectedCallback = () => {
      super.disconnectedCallback();
      this.database?.then((db) => db.close());
    }
  }

  return Database as Constructor<DatabaseMixinInterface> & T;
});
