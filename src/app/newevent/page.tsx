"use client"
import React from 'react'
import { Input, NextUIProvider, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { createEvent, getEventUrl } from "../server_layer/event";

export default function NewEvent() {
    const [availability, setAvailability] = useState(true);
    const [eventName, setEventName]= useState<null | string>(null)
    const [eventURL, setEventURL] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");


    const handleInputChange = (e:any) => {
        const name = e.target.value;
        setEventURL(name);
        checkAvailability(name);
    };
    const checkAvailability = async (name: string) => {
        const result = await getEventUrl(name)
        setAvailability(!result);
    };

  return (
    <div className='container min-h-screen'>
        <div className='max-w-xl mt-8'>
            
            
                <h1 className="text-3xl font-bold">Create an new Event</h1>
                <div className="mt-8 flex flex-col gap-8">
                    <Input
                    label="Event Name"
                    type="text"
                    labelPlacement="outside"
                    placeholder="Jhon & Jen's Wedding"
                    description="You can use your names like: Jen & Jhon"
                    isRequired
                    onChange={(e) => setEventName(e.target.value)}
                    />
                    <Input
                    label="Event URL"
                    type="text"
                    labelPlacement="outside"
                    placeholder="jhonjenwedding"
                    description="This is for the URL of your event e.g:havagala.com/form/jhonjenwedding"
                    isRequired
                    isInvalid={!availability}
                    errorMessage={!availability && "Event url is already taken"}
                    onChange={handleInputChange}
            
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

                
                <button className="mt-8 w-full rounded-md bg-primary p-2">
                    Create Event
                </button>
            </div>
        </div>
    </div>
  )
}
