import React from "react";
import { AppBar, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import jwt from "jsonwebtoken";


function Navbar() {
  const navstyle = {
    color: "white",
  };
  const { status, data: session } = useSession();

  const decodedToken = session?.userid ? jwt.decode(session.userid) : null;
  // console.log("decode -> ", decodedToken);

  return (
    <AppBar sx={{ position: "relative" }}>
      {status === "authenticated" && (
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Button sx={navstyle} href="/">
              Home
            </Button>
          </div>
          <div>
            <Button sx={navstyle} href="/user">
              User
            </Button>
            {decodedToken === 'admin' && (
              <Button sx={navstyle} href="/admin">
                Admin
              </Button>
            )}
            <Button onClick={() => signOut()} sx={navstyle}>
              Sign out
            </Button>
          </div>
        </div>
      )}
      {status === "unauthenticated" && (
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "end",
          }}
        >
          <Button sx={navstyle} href="/signin">
            Sign in
          </Button>
        </div>
      )}
    </AppBar>
  );
}

export default Navbar;


