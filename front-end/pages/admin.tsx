import React from "react";
import Navbar from "@/component/Navbar";
import Admintable from "../component/Admintable";
import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";

function admin({ userData }: any) {
  console.log(userData);
  return (
    <div>
      Hi, admin page
      {userData &&
        userData.map((user: any, index: number) => (
          <div key={index}>
            <p>Username : {user.username}</p>
            <p>Role : {user.role}</p>
          </div>
        ))}
    </div>
  );
}

export default admin;

export async function getServerSideProps(context: undefined) {
  const session = await getSession(context);
  let userData: any;
  if (session) {
    console.log("[Homepage] -> haved session");
    console.log("[Homepage] session -> ", session);
    console.log("[Homepage] session type -> ", typeof session);
    const username = jwt.verify(
      session.userid,
      "57918603f1c43835c880bce87fb2e050b22edafa4319e2732b20a1322e545647"
    );

    const response = await fetch(
      `http://127.0.0.1:8081/users/find/${username}`
    );
    const user = await response.json();

    if (user.role !== "admin") {
      userData = {};
    } else {
      const allResponse = await fetch(`http://127.0.0.1:8081/users`);
      const all = await allResponse.json();
      userData = all;
    }
  } else {
    console.log("[Homepage] -> no session");
  }

  return {
    props: { userData },
  };
}
