"use client"
import { Input, Checkbox, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation';
import {DatePicker} from "@nextui-org/date-picker";
import {TimeInput} from "@nextui-org/date-input";
import { toast } from 'react-hot-toast';
import { createEventForm, getEventById } from "../../server_layer/event";
import {Event} from "../../components/interfaces/interfaces"
import {Breadcrumbs, BreadcrumbItem, Skeleton} from "@nextui-org/react"; 
import {parseDate, getLocalTimeZone, parseTime} from "@internationalized/date";
import {imageUploader} from "../../utils/imageUploader"
import Image from "next/image";
export default function AddresForm() {

  const [event, setEvent] = useState<Event | any>(null);
  const [formTitle, setFormTitle] = useState<any>("");
  const [eventFormDate, setEventFormDate] = useState<any>("");
  const [eventFormTime, setEventFormTime] = useState<any>("");
  const [formDescription, setFormDescription] = useState("");
  const [picture, setPicture] = useState<string |null>(null);
  const [imageFile, setimageFile] =  useState<File | null>(null);
  

  const params = useParams();
  const router = useRouter();
  
  useEffect(()=> {
    if (params.id === null) {
      throw new Error("Event ID is missing.");
    }
    const fetchEvent = async ()=> {
     
      const result: Event | any = await getEventById(params.id)
      setEvent(result)
      setFormTitle(result?.eventName)
      setEventFormDate(result?.eventDate)
      setEventFormTime(result?.eventTime)
    }
    fetchEvent()
  }
  , [params.id])

  const handleSubmit = async (e: any) => {
    const imageResult = await imageUploader(imageFile)
    if(imageResult){
    // Save the image url in your object

    const data = {
      formTitle,
      eventFormDate,
      eventFormTime,
      formDescription,
      picture:imageResult,
      eventURL: event?.eventURL,
    };
    console.log(data);
    const result = await createEventForm(data);
    if(result){
      toast.success("Sucessfully Created an Event")
      router.push("/dashboard")
    }
    else{
      toast.error("Fail to create and Event")
    }
    }
  };

 
  return (
    <div className="container min-h-screen mt-8">
      {event ?
        <>
        <div className='mb-8'>
          <Breadcrumbs variant={"solid"}>
            <BreadcrumbItem href='/dashboard'>Dashboard</BreadcrumbItem>
            <BreadcrumbItem href="/events">Events</BreadcrumbItem>


            {event ? <BreadcrumbItem href={`/events/${event?.eventURL}`}>{event?.eventName}</BreadcrumbItem>
            
            : <BreadcrumbItem>...</BreadcrumbItem>}
              
      
            <BreadcrumbItem>Create Form</BreadcrumbItem>
              
            

          </Breadcrumbs>
        </div>
        <div className="max-w-[500px]">
          <h1 className="text-3xl font-bold">Address form for: <span>{event?.eventName}</span></h1>
          <div className="mt-8 flex flex-col gap-8">
            <div>
          
                <Input
                  label="Form Title"
                  type="text"
                  labelPlacement="outside"
                  isRequired
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              
           

            </div>
          
            {/* <Input
              label="Image URL"
              type="text"
              labelPlacement="outside"
              placeholder="https://www.example.com/image.jpg"
              onChange={(e) => setPicture(e.target.value)}
            /> */}
            <input type="file" onChange={(event) => {
              const file = event.target.files?.[0];
              if(file){
                setimageFile(file)
              };
            }}/>
                     
            <div className="flex gap-4">
            <div>
                <div className="flex gap-4">
                  <DatePicker label="Event date" className="w-full"
                  defaultValue={parseDate(eventFormDate)}
                  showMonthAndYearPickers
                  labelPlacement='outside' onChange={(e)=>setEventFormDate(e.toString())}/>
                  <TimeInput 
                          label="Event Time" 
                          labelPlacement="outside" 
                          className="w-fit"
                          defaultValue={parseTime(eventFormTime)}
                          onChange={(e)=>setEventFormTime(e.toString())}
                  />
                </div>
          
            </div>
            </div>
            <Textarea
              label="Message"
              placeholder="Write your text here.."
              labelPlacement="outside"
              isRequired
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </div>
          <button onClick={(e)=>handleSubmit(e)} className="mt-8 w-full rounded-md bg-primary p-2">
            Create Form
          </button>
        </div>
        </>
      :
      <div>
        <Skeleton  className="rounded-md max-w-[400px]">
          <div className="h-6 rounded-md bg-secondary max-w-[400px]"></div>
        </Skeleton>
        <Skeleton  className="rounded-md max-w-[500px] mt-8">
          <div className="h-10 rounded-md bg-secondary max-w-[500px]"></div>
        </Skeleton>
        <Skeleton  className="rounded-md w-[100px] mt-8">
          <div className="h-4 rounded-md bg-secondary w-[100px]"></div>
        </Skeleton>
        <Skeleton  className="rounded-md max-w-[500px] mt-4">
          <div className="h-8 rounded-md bg-secondary max-w-[500px]"></div>
        </Skeleton>
        <Skeleton  className="rounded-md w-[100px] mt-8">
          <div className="h-4 rounded-md bg-secondary w-[100px]"></div>
        </Skeleton>
        <Skeleton  className="rounded-md max-w-[500px] mt-4">
          <div className="h-8 rounded-md bg-secondary max-w-[500px]"></div>
        </Skeleton>
        <Skeleton  className="rounded-md w-[100px] mt-8">
          <div className="h-4 rounded-md bg-secondary w-[100px]"></div>
        </Skeleton>
        <Skeleton  className="rounded-md max-w-[500px] mt-4">
          <div className="h-8 rounded-md bg-secondary max-w-[500px]"></div>
        </Skeleton>
        <Skeleton  className="rounded-md w-[100px] mt-8">
          <div className="h-4 rounded-md bg-secondary w-[100px]"></div>
        </Skeleton>
        <Skeleton  className="rounded-md max-w-[500px] mt-4">
          <div className="h-24 rounded-md bg-secondary max-w-[500px]"></div>
        </Skeleton>
        
        
      </div>
  }
    </div>
  );
}
