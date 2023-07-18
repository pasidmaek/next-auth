import React from "react";
import { AppBar, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { navList } from "../constant/role";
import { useSelector } from "react-redux";

function Navbar() {
  const { status, data: session } = useSession();
  const navstyle = {
    color: "white",
  };
  // console.log('session is = ',session);

  // const [role,setRole] = React.useState('');
  // const fetchData = async() => {
  //   const response = await fetch(`http://127.0.0.1:3080/users/checkrole/${username}`, { mode: 'no-cors'});
  //   let data = await response.json();
  //   setRole(data);
  //   console.log('role -> ',response)
  // }
  // React.useEffect(()=>{
  //   fetchData()
  // })

  const username = jwt.decode(session?.userid);

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
          item.accessRole?.includes(username) && session ? (
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
              (item.accessRole?.length==0)&&(session === undefined || session === null)&& ( 
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