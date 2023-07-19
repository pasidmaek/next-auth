"use client";
import React, { useState } from "react";

type Props = {};

type Data = {
  userId: number;
  id: number;
  title: string;
};

const TestFetchPage = (props: Props) => {
  const [search, setSearch] = useState(0);
  const [data, setData] = useState<Data>();

  const onSearch = (e: any) => {
    e.preventDefault();
    console.log("[TestFetchPage] search : ", search);

    fetch(`/data/${search}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  };

  return (
    <>
      <h1>TestFetchPage</h1>
      <form action="">
        <label htmlFor="search todo">Search Todo : </label>
        <input
          type="number"
          name="search"
          id="search"
          onChange={(e) => setSearch(Number(e.target.value))}
          className="border-gray-500 border rounded-lg"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(e);
            }
          }}
        />
        <div
          onClick={(e) => onSearch(e)}
          style={{
            cursor: "pointer",
            border: "1px solid black",
            padding: "0.2rem 1rem",
            margin: "0 1rem",
            display: "inline",
            borderRadius: "5px",
          }}
        >
          Search
        </div>
      </form>
      {data ? (
        <div>
          <p>UserId : {data.userId}</p>
          <p>id : {data.id}</p>
          <p>Title : {data.title}</p>
        </div>
      ) : search !== 0 ? (
        ""
      ) : (
        "set search to fetch data..."
      )}
    </>
  );
};

export default TestFetchPage;
