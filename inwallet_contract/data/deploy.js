const shell = require("shelljs");

// 컴파일 명령어
const compileString = "truffle compile";
// 배포 명령어
const deployString = "truffle deploy --network polygonTest --compile-none";

const init = async () => {
  console.log("-------------- 컴파일을 시작합니다. --------------");

  try {
    console.log("잘 되느냐");
  } catch (err) {
    console.log("-----------------------------------------------------");
    console.log("배포중 문제가 생겼습니다. 에러 : ", err);
  }
};

init();
