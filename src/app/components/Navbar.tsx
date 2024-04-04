"use client";
import { useState } from "react";
import { useUser } from "./context/UserContext";
import Login from "./login-btn";

export default function Navbar() {

  const { userData } = useUser();

  return (
    <div className="flex justify-between p-4 font-bold shadow no-print">
      <a href="./dashboard">Havagala</a>
      <div>
        <Login />
      </div>
    </div>
  );
}
