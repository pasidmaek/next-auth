import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import { Button } from "@mui/material";

export default function Home() {
  const { status, data } = useSession();
  const { data: session } = useSession();
  useEffect(() => {
    console.log(data);
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);
  return (
    <div>
      <p>role : {session ? session.user.user.role : "null"}</p>
      Index Page
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}
