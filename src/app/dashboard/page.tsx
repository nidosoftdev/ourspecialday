"use client";
import { useState } from "react";
import Blog from "../components/Blog";

export default function Dashboard() {

  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold">Welcome</h1>
        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <a
            href="./adressform"
            className="flex w-full cursor-pointer gap-4 rounded-md border p-4 hover:bg-zinc-50"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-clipboard-text"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                <path d="M9 12h6" />
                <path d="M9 16h6" />
              </svg>
            </div>
            <p>Create an address form</p>
          </a>
          <div className="flex w-full cursor-pointer gap-4 rounded-md border p-4 hover:bg-zinc-50">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-device-laptop"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 19l18 0" />
                <path d="M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
              </svg>
            </div>
            <p>Create an event site</p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="mb-8 text-2xl font-bold">Blog</h1>
        <Blog />
      </div>
    </div>
  );
}
