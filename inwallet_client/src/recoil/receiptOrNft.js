import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const receiptOrNft = atom({
  key: "receiptOrNft",
  default: {
    whichSelect: "receipt",
  },
  effects_UNSTABLE: [persistAtom],
});
