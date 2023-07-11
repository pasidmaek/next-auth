import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";

export default function Home({ userData }: any) {
  return (
    <div>
      Hi <span>{userData.username}</span>
    </div>
  );
}

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
      `http://127.0.0.1:3080/users/find/${username}`
    );

    userData = await response.json();
  } else {
    console.log("[Homepage] -> no session");
  }

  return {
    props: { userData },
  };
}
