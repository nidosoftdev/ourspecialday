"use client";
import { useState } from "react";
import { useUser } from "./context/UserContext";
import Login from "./login-btn";

export default function Navbar() {

  const { userData } = useUser();

  return (
    <div className="flex bg-white p-4 rounded-md justify-between items-center font-bold shadow no-print">
      <a href="/dashboard" className="logo">Havagala</a>
      <div>
        <Login />
      </div>
    </div>
  );
}
