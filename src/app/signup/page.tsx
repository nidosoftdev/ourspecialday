"use client";
import { useEffect, useState } from "react";
import { NextUIProvider, Input, Checkbox, Button } from "@nextui-org/react";
import {getAllUsers, getUserByEmail, createUser, updateUserByEmail, deleteUserByEmail} from "../server_layer/user"
import {createUserWithEmailPassword,signInUser} from "../server_layer/authentication"
import {createAddress, getAllAddress, getAddressById, deleteAddressById, updateAddressById} from "../server_layer/address"
import {createEventSite, getAllEventSite} from "../server_layer/eventSite"


export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e:any) => {
    e.preventDefault()
    const user = await createUserWithEmailPassword({"email":email, "name":name, "password":password})
  }

  return (
    <NextUIProvider>
      <form className="mx-auto grid max-w-[600px] p-8">
        <div>
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="mt-4 text-sm">
            Start by creating an account to access all the features of our app.
          </p>
          <div className="mt-8 flex flex-col gap-6">
            <Input
              type="text"
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Checkbox defaultSelected radius="sm">
              <p className="text-sm">Accept terms of Service</p>
            </Checkbox>
            <button
              type="submit"
              className="bg-primary rounded-md py-3 text-white"
              onClick={(e)=>signup(e)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </NextUIProvider>
  );
}
