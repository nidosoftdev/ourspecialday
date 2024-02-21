"use client";
import { Input, NextUIProvider, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function AddresForm() {
  const [formTitle, setFormTitle] = useState("");
  const [formURL, setFormURL] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [picture, setPicture] = useState<File | null>(null);


  return (
    <div className="max-w-[600px]">
      <h1 className="text-3xl font-bold">Create an address form</h1>
      <div className="mt-8 flex flex-col gap-8">
        <Input
          label="Form Title"
          type="text"
          labelPlacement="outside"
          placeholder="Jhon & Jen's Wedding"
          description="You can use your names like: Jen & Jhon"
          isRequired
          onChange={(e) => setFormTitle(e.target.value)}
        />
        <Input
          label="Form URL"
          type="text"
          labelPlacement="outside"
          placeholder="jhonjenwedding"
          description="This is for the URL of your form"
          isRequired
          onChange={(e) => setFormURL(e.target.value)}
        />
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Header Image
          <input
            className="mt-2 block w-full cursor-pointer rounded-xl bg-[#F5F5F5] p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setPicture(e.target.files[0]);
              }
            }}
          />
        </label>

        <div className="flex gap-4">
          <Input
            label="Month"
            type="text"
            labelPlacement="outside"
            placeholder="MM"
            isRequired
            onChange={(e) => setMonth(e.target.value)}
          />
          <Input
            label="Day"
            type="text"
            labelPlacement="outside"
            placeholder="DD"
            isRequired
            onChange={(e) => setDay(e.target.value)}
          />
          <Input
            label="Year"
            type="text"
            placeholder="YYYY"
            labelPlacement="outside"
            isRequired
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <Textarea
          label="Form Description"
          placeholder="Write your text here.."
          labelPlacement="outside"
          isRequired
          onChange={(e) => setFormDescription(e.target.value)}
        />
      </div>
      <button onClick={(e)=>handleSubmit(e)} className="mt-8 w-full rounded-md bg-blue-500 p-2 text-white">
        Create Form
      </button>
    </div>
  );
}
