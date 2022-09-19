import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../component/Header";
// import LoginButton from "../component/LoginButton";
// import LogoutButton from "../component/LogoutButton";
// import Login from "../component/Login";
// import { useRecoilState } from "recoil";
// import { userState } from "../recoil/user";


export default function Main() {
//   const [user, setUser] = useRecoilState(userState);
//   console.log(user);

  // useEffect(() => {
  //   if (user.isLogin) {
  //     console.log("로그인이 잘 되었다.");
  //   } else {
  //     console.log("없다.");
  //   }
  // }, [user]);
  const handleClick = () => {
    window.location.reload();
  }

  return (
    <Box>
      
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Header/>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  border: 1,
                  width: "75%",
                  padding: "5%",
                }}
              >
                {/* <Box sx={{ mb: "5%" }}>Main net Address: {user.mainAddress}</Box> */}
                {/* <Box>Test net Address: {user.testAddress}</Box> */}
                {/* <GetTestAddressButton user={user} /> */}
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "5%" }}>
              {/* <LogoutButton /> */}
            </Box>
        </Box>
      
    </Box>
  );
}