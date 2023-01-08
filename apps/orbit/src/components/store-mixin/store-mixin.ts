import { persistentAtom } from "@nanostores/persistent";
import { dedupeMixin, type Constructor } from "@open-wc/dedupe-mixin";
import type { LitElement } from "lit";
import type { WritableAtom } from "nanostores";

export type Marker = {
  id: string;
  name: string;
  position: [x: number, y: number, z: number];
  content: string;
};

export declare class StoreMixinInterface {
  markers: WritableAtom<Marker[]>;
}

export const StoreMixin = dedupeMixin(<T extends Constructor<LitElement>>(superClass: T) => {
  class Store extends superClass {
    markers = persistentAtom<Marker[]>("markers", [], {
      encode: JSON.stringify,
      decode: JSON.parse,
    });
  }

  return Store as Constructor<StoreMixinInterface> & T;
});
