import React from "react";
import { AppBar, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { navList } from "../../constant/role";
import { useSelector } from "react-redux";

interface IUser{
  role:boolean;
}

function Navbar(props:IUser) {
  const { status, data: session } = useSession();
  const navstyle = {
    color: "white",
  };

  const username = jwt.decode(session?.userid);
  //console.log("session -> ", username);
  //console.log('status-> ', status)

  return (
    <AppBar sx={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "end",
        }}
      >
        {navList.map((item, index) => (
          item.auth === 'authenticated' && status == 'authenticated' && item.accessRole?.includes(username) ? (
            <Button
              key={index}
              sx={navstyle}
              href={item.path}
              onClick={() => {
                if (item.navName === 'signout')
                  signOut()
              }
              }
            >
              {item.navName}
            </Button>

          )

            : (
              item.auth === 'unauthenticated' && status == 'unauthenticated' && (
                <Button
                  key={index}
                  sx={navstyle}
                  href={item.path}
                  onClick={() => {
                    if (item.navName === 'signout')
                      signOut()
                  }
                  }
                >
                  {item.navName}
                </Button>
              )
            )))
        }
      </div>
    </AppBar>
  );
}

export default Navbar;


