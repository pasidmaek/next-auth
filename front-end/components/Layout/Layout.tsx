import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { signOut, useSession, getSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import useSWR from 'swr';


export default function Layout(props: any) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(false);
  const { status, data: session } = useSession();

  if (session) {
    const _username = jwt.decode(session?.userid)?.toString();
    setUsername(_username);
    console.log('username ->', username);
  }
  useEffect(() =>{
       fetch(`http://127.0.0.1:3080/users/checkrole/${username}`)
        .then(response => response.json())
        .then(data => setRole(data.status))
    }
  )

  console.log('role status -> ', role)
  return (
    <>
      <Navbar role={role} />
      {props.children}
    </>
  );
}

