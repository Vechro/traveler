import { persistentAtom } from "@nanostores/persistent";

export type Marker = {
  id: string;
  name: string;
  position: [x: number, y: number, z: number];
  content: string;
};

export const $markers = persistentAtom<Marker[]>("markers", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
