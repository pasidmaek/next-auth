import React, { useEffect } from "react";
import Admintable from "../components/Admintable";
import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser, updateUser } from "../features/userSlice";
import { RootState } from "./store";

function admin({ userData }: any) {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const updateUserData = {
    username: "bobupdate!",
    password: "bob123",
    email: "bob@mail.com",
    role: "user",
    id: 3,
    imgurl:
      "https://i.pinimg.com/564x/4a/ca/6f/4aca6fdd35b62296dcf6d79ada4d95e0.jpg",
  };
  useEffect(() => {
    dispatch(getUser(userData));
    // console.log(userData);
  }, [dispatch, userData]);
  // useEffect(() => {
  //   console.log(users);
  // }, [users]);
  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
      >
        {users && <Admintable data={users} />}
      </div>
      {/* <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          dispatch(deleteUser(3));
        }}
      >
        delete
      </button>

      <button
        onClick={() => {
          dispatch(updateUser(updateUserData));
        }}
      >
        update
      </button> */}
    </>
  );
}

export default admin;

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

    const allResponse = await fetch(`http://127.0.0.1:5000/users`);
    const all = await allResponse.json();
    console.log("[admin] all ->", all);
    const check = all.filter((user: any) => {
      return user.username === username;
    });
    // console.log("[admin] check ->", check);
    if (all && check[0].role === "admin") {
      userData = all;
    } else {
      userData = [{}];
    }

    // console.log("[admin] userData ->", userData);

    // const response = await fetch(
    //   `http://127.0.0.1:5000/users/find/${username}`
    // );
    // const user = await response.json();

    // if (user.role !== "admin") {
    //   userData = {};
    // } else {
    //   const allResponse = await fetch(`http://127.0.0.1:8081/users`);
    //   const all = await allResponse.json();
    //   userData = all;
    // }
  } else {
    console.log("[Homepage] -> no session");
  }

  return {
    props: { userData },
  };
}
