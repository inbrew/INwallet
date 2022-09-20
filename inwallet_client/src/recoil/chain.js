import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const chainState = atom({
  key: "chain",
  default: {
    SelectChain: "",
  },
  effects_UNSTABLE: [persistAtom],
});
