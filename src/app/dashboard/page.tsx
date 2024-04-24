"use client";
import { useEffect, useState } from "react";
import Blog from "../components/Blog";
import Image from 'next/image'
import { useUser } from "../components/context/UserContext";
export default function Dashboard() {
  

  const { userData, loading } = useUser();

  
  return (
    <div className="container min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">Welcome {userData?.displayName}</h1>
        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <a
            href="./newevent"
            className="flex items-center w-full cursor-pointer gap-4 rounded-md border p-4 hover:bg-zinc-50"
          >
            <div>
            <Image src="/calendar-icon.png" width={40} height={40} alt="icon of a calendar"/>
            
            </div>
            <p>Create an Event</p>
          </a>

          <a
              href="./events"
              className="flex items-center w-full cursor-pointer gap-4 rounded-md border p-4 hover:bg-zinc-50"
            >
              <div>
              <Image src="/edit.png" width={40} height={40} alt="icon of a calendar"/>

              </div>
              <p>Manage your events</p>
            </a>
          
        </div>
      </div>
      
      <div className="mt-10">
        <h1 className="mb-8 text-2xl font-bold">Blog</h1>
        <Blog />
      </div>
    </div>
  );
}
