"use client"
import React from 'react'
import { Input, NextUIProvider, Textarea } from "@nextui-org/react";
import {DatePicker} from "@nextui-org/date-picker";
import { useEffect, useState } from "react";
import { createEvent, getEventUrl } from "../server_layer/event";
import { useUser } from "../components/context/UserContext";
import toast from 'react-hot-toast';

export default function NewEvent() {
    const [availability, setAvailability] = useState(true);
    const [eventName, setEventName]= useState<null | string>(null)
    const [eventURL, setEventURL] = useState("");
    const [eventDate, setEventDate] = useState("");

    const {userData} = useUser();
    console.log(userData?.uid)
    const handleInputChange = (e:any) => {
        const name = e.target.value;
        setEventURL(name);
        checkAvailability(name);
    };
    const checkAvailability = async (name: string) => {
        const result = await getEventUrl(name)
        setAvailability(!result);
    };


 
    const handleCreateEvent = async ()=> {
        const data = {
            eventName: eventName,
            eventURL:eventURL,
            eventDate: eventDate,
            userId: userData?.uid
        }
        try {
            const result = await createEvent(data);
            if (result) {
                console.log(result)
                toast.success("Event created sucessfuly")
            }
        } catch(error) {
            toast.error("There was an error creating the event")
            console.log(error)
        }
    }

  return (
    <div className='container min-h-screen'>
        <div className='max-w-xl mt-8'>
            
            
                <h1 className="text-3xl font-bold">Create a new Event</h1>
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
                    <DatePicker label="Event date" className="w-full"
                    labelPlacement='outside' onChange={(e)=>setEventDate(e.toString())}/>
                </div>

                
                <button className="mt-8 w-full rounded-md bg-primary p-2"
                    onClick={handleCreateEvent}
                >
                    Create Event
                </button>
            </div>
        </div>
    </div>
  )
}
