"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [isValid, setIsValid] = useState(null);
  const checkTokenExpiration = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      // @ts-ignore
      if (decodedToken.exp < currentTime) {
        console.log("Token has expired");
        // Handle token expiration (e.g., logout user, redirect to login, etc.)
        localStorage.removeItem("token");
        const res = await axios.post("http://localhost:8080/token", {
          token: refreshToken,
        });
        console.log(res.data.accessToken);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        // Redirect to login or show a message
      } else {
        console.log("Token is valid");
      }
    }
  };
  checkTokenExpiration();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      console.log(token);
      axios
        .get("http://localhost:8080", {
          headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
        })
        .then((res) => {
          console.log("Your status is " + res.status);
          if (res.data.isValid) {
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%]">
      {isValid == null && (
        <h1 className="text-2xl tracking-wide">
          Wait a second we're checking your{" "}
          <span className="bg-green-100">authentication</span> status...
        </h1>
      )}
      {isValid === false && (
        <h1 className="text-6xl tracking-wide">
          Tyre got{" "}
          <span className="text-red-500 bg-red-100 font-bold">flattened</span>.
        </h1>
      )}
      {isValid === true && (
        <h1 className="text-8xl">
          Welcome to{" "}
          <span className="text-indigo-600 bg-indigo-100 font-bold">ryde</span>.
        </h1>
      )}
    </div>
  );
}
