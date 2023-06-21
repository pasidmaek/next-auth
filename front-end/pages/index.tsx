import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import { Button } from "@mui/material";
import Navbar from "@/component/Navbar";

export default function Home() {
  const { status, data: session } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);
  return (
    <div>
      
    </div>
  );
}
