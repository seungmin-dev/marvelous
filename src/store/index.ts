import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const modeState = atom({
  default: "light",
  key: "modeState",
  effects_UNSTABLE: [persistAtom],
});
