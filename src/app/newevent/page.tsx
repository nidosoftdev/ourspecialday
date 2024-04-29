"use client"
import React from 'react'
import { Input } from "@nextui-org/react";
import {TimeInput} from "@nextui-org/date-input";
import {DatePicker} from "@nextui-org/date-picker";
import { useEffect, useState } from "react";
import { createEvent, getEventUrl } from "../server_layer/event";
import { useUser } from "../components/context/UserContext";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function NewEvent() {
    const [availability, setAvailability] = useState(true);
    const [eventName, setEventName]= useState<null | string>(null)
    const [eventURL, setEventURL] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");

    const {userData} = useUser();
    const router = useRouter();

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
            eventTime: eventTime,
            userId: userData?.uid
        }
        try {
            const result = await createEvent(data);
            if (result) {
      
                toast.success("Event created sucessfuly")
                router.push("/events")
            }
        } catch(error) {
            toast.error("There was an error creating the event")
            console.log(error)
        }
    }

  return (
    <div className='container min-h-screen'>
        <div className='max-w-xl mt-8'>
            
            
                <h1 className="text-3xl font-bold">Create a new event</h1>
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
                <div className="gap-4 flex">
                    <DatePicker label="Event date" 
                    showMonthAndYearPickers
                    labelPlacement='outside' className="w-fit" onChange={(e)=>setEventDate(e.toString())}/>
                    <TimeInput 
                        label="Event Time" 
                        labelPlacement="outside" 
                        className="w-fit"
                        onChange={(e)=>setEventTime(e.toString())}
                    />
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
