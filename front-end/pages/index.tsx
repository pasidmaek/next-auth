import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import { Button } from "@mui/material";

export default function Home() {
  const { status, data } = useSession();

  useEffect(() => {
    console.log(data);
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);
  return (
    <div>
      Index Page
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}
