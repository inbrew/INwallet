import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const txState = atom({
  key: "transactionHash",
  default: {
    tx: "",
  },
  effects_UNSTABLE: [persistAtom],
});
