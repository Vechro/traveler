import { persistentAtom } from "@nanostores/persistent";
import type { WritableAtom } from "nanostores";

export type Marker = {
  id: string;
  name: string;
  position: [x: number, y: number, z: number];
  content: string;
};

export const $markers: WritableAtom<Marker[]> = persistentAtom<Marker[]>("markers", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
