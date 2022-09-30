import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const addressState = atom({
  key: "address",
  default: {
    AVAXAddress: "",
    BNBAddress: "",
    BNBPrivateKey: "",
    BNBBalance: "",
    ETHAddress: "",
    ETHPrivateKey: "",
    ETHBalance: "",
    ONEAddress: "",
    KLAYAddress: "",
    KLAYPrivateKey: "",
    KLAYBalance: "",
    MATICAddress: "",
    STXAddress: "",
  },
  effects_UNSTABLE: [persistAtom],
});
