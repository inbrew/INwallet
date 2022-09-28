import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const txState = atom({
  key: "transactionHash",
  default: {
    tx: null,
  },
  effects_UNSTABLE: [persistAtom],
});
