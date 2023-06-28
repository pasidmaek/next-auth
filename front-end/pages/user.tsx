import React from "react";
import Navbar from "@/component/Navbar";
import { useSession } from "next-auth/react";

function user() {
  const { data } = useSession();
  return <div>User, Hi</div>;
}

export default user;
