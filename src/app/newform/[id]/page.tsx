"use client"
import { Input, Checkbox, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation';
import {DatePicker} from "@nextui-org/date-picker";
import { toast } from 'react-hot-toast';
import { createEvent, getEventById } from "../../server_layer/event";
import {Event} from "../../components/interfaces/interfaces"
import {Breadcrumbs, BreadcrumbItem, Skeleton} from "@nextui-org/react"; 

export default function AddresForm() {

  const [event, setEvent] = useState<Event | any>(null);
  const [formTitle, setFormTitle] = useState<any>("");
  const [sameTitle, setSameTitle] = useState(true);
  const [eventDate, setEventDate] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [picture, setPicture] = useState<string | null>(null);

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
    }
    fetchEvent()
  }
  , [params.id])

  const handleSubmit = async (e: any) => {

    const data = {
      formTitle,
      eventDate,
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
            {event?.eventName !== undefined ? (
              sameTitle ? 
                <Input
                  label="Form Title Event"
                  type="text"
                  labelPlacement="outside"
                  value={formTitle}
                  isRequired
                  isDisabled
                  
                />
              : 
                <Input
                  label="Form Title"
                  type="text"
                  labelPlacement="outside"
                  isRequired
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              
            ) : "Loading..."
            }
            <Checkbox
              defaultSelected={sameTitle}
              isSelected={sameTitle}
              onValueChange={(value) => {setSameTitle(value); setFormTitle(event?.eventName)}}
              className="mt-1 text-slate-500"
              size="sm"
            >
              Use same title as event's name
            </Checkbox>

            </div>
          
            <Input
              label="Image URL"
              type="text"
              labelPlacement="outside"
              placeholder="https://www.example.com/image.jpg"
              onChange={(e) => setPicture(e.target.value)}
            />
            <div className="flex gap-4">
            <div className="flex gap-4">
                      <DatePicker label="Event date" className="w-full"
                      labelPlacement='outside' onChange={(e)=>setEventDate(e.toString())}/>
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
