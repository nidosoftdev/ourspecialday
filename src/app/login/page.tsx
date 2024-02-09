"use client";
import { Checkbox, Input, NextUIProvider } from "@nextui-org/react";
import { useState,  } from "react";



export default function Login() {


  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);



  return (
    <NextUIProvider>
      <div className="mx-auto grid max-w-[600px] p-8">
        <div>
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-4 text-sm">
            Welcome back! Please login to your account.
          </p>
        </div>
        <form
          className="mt-8 flex flex-col gap-6"
          method="post"
          action="/api/auth/signin/email"
        >
          <input name="csrfToken" type="hidden"/>
          <Input
            classNames={{
              inputWrapper: [],
            }}
            type="email"
            label="Email"
            radius="sm"
        
          />
          <Input
            classNames={{
              inputWrapper: [],
            }}
            type={isVisible ? "text" : "password"}
            label="Password"
            radius="sm"
            
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye"
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
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
              </button>
            }
          />
          <Checkbox defaultSelected radius="sm">
            <p className="text-sm">Remember me</p>
          </Checkbox>
          {/* If user don't have an account */}
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-primary">
              Sign up
            </a>
          </p>
          <button
            className="bg-primary rounded-md py-3 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </NextUIProvider>
  );
}
