import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import userSlice from "@/features/userSlice";
import useSWR from "swr";

export default function Layout(props: any) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(false);

  const { status, data: session } = useSession();

  const fetcher = (user: any) =>
    fetch(`http://127.0.0.1:3080/users/checkrole/${username}`).then((res) =>
      res.json()
    );

  useEffect(() => {
    if (session) {
      // fetchData();
      const _username = jwt.decode(session?.userid)?.toString();
      setUsername(_username);
      console.log("props children ->", _username);

      // fetch(`http://127.0.0.1:3080/users/checkrole/${_username}`)
      // .then(response => response.json())
      // .then(data => setRole(data.status))
    }
  }),
    [];

  const { res, error } = useSWR(`/users/checkrole/${username}`, fetcher);
  console.log("use SWR -> ", res);

  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}
