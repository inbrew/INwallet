import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const addressState = atom({
  key: "address",
  default: {
    AVAXAddress: "",
    BNBAddress: "",
    ETHAddress: "",
    ETHPrivateKey: "",
    ETHBalance: 0,
    ONEAddress: "",
    KLAYAddress: "",
    MATICAddress: "",
    STXAddress: "",
  },
  effects_UNSTABLE: [persistAtom],
});
