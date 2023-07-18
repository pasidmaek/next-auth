import React from "react";
import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";

function User({ userData }: any) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div style={{ margin: "2rem" }}>
        <img
          src={userData.imgurl}
          style={{ borderRadius: "50%", maxHeight: "5rem" }}
          alt="User Profile"
        />
      </div>
      <div style={{ margin: "2rem" }}>
        <div>username : {userData.username}</div>
        <br />
        <div>email : {userData.email}</div>
      </div>
    </div>
  );
}

export default User;

export async function getServerSideProps(context: undefined) {
  const session = await getSession(context);
  let userData: any;
  if (session) {
    /*  console.log("[Homepage] -> haved session");
    console.log("[Homepage] session -> ", session);
    console.log("[Homepage] session type -> ", typeof session); */
    const username = jwt.verify(
      session.userid || "",
      "57918603f1c43835c880bce87fb2e050b22edafa4319e2732b20a1322e545647"
    );

    const response = await fetch(
      `http://127.0.0.1:3080/users/find/${username}`,
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    const userData = await response.json();

    return {
      props: { userData },
    };
  }
}
