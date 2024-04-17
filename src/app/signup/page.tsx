"use client";
import { useEffect, useState } from "react";
import { NextUIProvider, Input, Checkbox, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import {getAllUsers, getUserByEmail, createUser, updateUserByEmail, deleteUserByEmail} from "../server_layer/user"
import {signup,signInUser} from "../server_layer/authentication"
import {createAddress, getAllAddress, getAddressById, deleteAddressById, updateAddressById} from "../server_layer/address"
import {createEventSite, getAllEventSite} from "../server_layer/eventSite"
import toast from "react-hot-toast";
import {auth} from "../server_layer/config"

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTest = async(e:React.FormEvent)=>{
    e.preventDefault()
    console.log("here")
    const allusers = await getAllUsers()
   
    console.log(allusers)
  }


  const signUp = async (e:React.FormEvent) => {
    e.preventDefault()
    const user = await signup({"email":email, "name":name, "password":password})
    console.log(user)
    if(user){
      toast.success("Account sucessfully create")
      router.push('/login');
    }
    else{
      toast.error("Fail to create the user. Try Again")
    }
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
              className="bg-primary rounded-md py-3"

              onClick={(e)=>signUp(e)}

            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </NextUIProvider>
  );
}
