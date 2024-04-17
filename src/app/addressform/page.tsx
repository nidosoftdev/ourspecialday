"use client"
import { Input, NextUIProvider, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { createEvent, getEventUrl } from "../server_layer/event";

export default function AddresForm() {
  const [formTitle, setFormTitle] = useState("");
  const [formURL, setFormURL] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [picture, setPicture] = useState<string | null>(null);
  const router = useRouter();
  const [availability, setAvailability] = useState(true);

  const checkAvailability = async (name: string) => {
    const result = await getEventUrl(name)
    setAvailability(!result);
  };

  const handleInputChange = (e:any) => {
    const name = e.target.value;
    setFormURL(name);
    checkAvailability(name);
  };

  const handleSubmit = async (e: any) => {
    console.log("submitting");
    const data = {
      formTitle,
      formURL,
      month,
      day,
      year,
      formDescription,
      picture,
    };
    console.log(data);
    const result = await createEvent(data);
    if(result){
      toast.success("Sucessfully Created an Event")
      router.push("/dashboard")
    }
    else{
      toast.error("Fail to create and Event")
    }
  };

  return (
    <div className="max-w-[600px]">
      <h1 className="text-3xl font-bold">Create an address form for your Event</h1>
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
        <div>
          <Input
            label="Form URL"
            type="text"
            labelPlacement="outside"
            placeholder="jhonjenwedding"
            description="This is for the URL of your form"
            isRequired
            onChange={handleInputChange}
            style={{ color: availability ? 'green' : 'red' }}
          />
          {!availability && <p style={{ color:'red' }}>Form URL is already taken</p>}
        </div>
        <Input
          label="Image URL"
          type="text"
          labelPlacement="outside"
          placeholder="https://www.example.com/image.jpg"
          onChange={(e) => setPicture(e.target.value)}
        />
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
          label="Our Story"
          placeholder="Write your text here.."
          labelPlacement="outside"
          isRequired
          onChange={(e) => setFormDescription(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} className="mt-8 w-full rounded-md bg-blue-500 p-2 text-white">
        Create Form
      </button>
    </div>
  );
}
