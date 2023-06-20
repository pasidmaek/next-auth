import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

export default function Home() {
  const { status, data } = useSession();

  useEffect(() => {
    console.log(data);
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);
  return <div>Hi</div>;
}
