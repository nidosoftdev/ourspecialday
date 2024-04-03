"use client";
import { useState } from "react";
import Login from "./login-btn";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 font-bold shadow no-print">
      <a href="./dashboard">ourspecialevent</a>
      <div>
        <Login />
      </div>
    </div>
  );
}
