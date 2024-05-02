"use client"
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react"; 
import { useUser } from '../../components/context/UserContext'
import { getEventById } from '../../server_layer/event'
import { Event } from '../../components/interfaces/interfaces'
import { getEventForm } from '../../server_layer/event';
import Image from 'next/image'
export default function page() {
  
  const [event, setEvent] = useState<Event | any>(undefined)
  const [form, setForm] = useState<any>(undefined)
  const router = useRouter()
  const params = useParams()

  const eventURL: string = typeof params.id === 'string' ? params.id : '';

  useEffect(()=> {
    const fetchEvent = async ()=> {
      const result = await getEventById(eventURL)
      setEvent(result)
    }
    fetchEvent()

    const fetchForm = async ()=> {
      const result = await getEventForm(eventURL)
      if (result) {
        setForm(result)
      
      }
    }
    fetchForm()
  }
  , [params.id])
  
  console.log(form)

  return (
    <div className='container mt-8 min-h-screen'>
      <div className='mb-8'>
        <Breadcrumbs variant={"solid"}>
          <BreadcrumbItem href='/dashboard'>Dashboard</BreadcrumbItem>
          <BreadcrumbItem href='/events'>Events</BreadcrumbItem>
          <BreadcrumbItem>{event?.eventName}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <h1 className='text-3xl font-bold'>{event?.eventName}</h1>
        {event?.eventDate&&
        <h2>{
          `${new Intl.DateTimeFormat('en-US', {month: 'long', day: "numeric", year:"numeric"}).format(new Date(`${event?.eventDate}T00:00`))}`
        }</h2>
        }
      </div>
      <div>
        {form ?
         <a href={`/newform/${event?.eventURL}`} className="flex items-center md:w-1/2 w-full px-3 py-4 cursor-pointer gap-4 
                    border rounded-md shadow-sm 
                   hover:bg-zinc-50 mt-8">
          <Image src="/form.png" width={40} height={40} alt="icon of a calendar"/>

          Edit Address Form
        </a>:
        <a href={`/newform/${event?.eventURL}`} className="flex items-center md:w-1/2 w-full px-3 py-4 cursor-pointer gap-4 
        border rounded-md shadow-sm 
       hover:bg-zinc-50 mt-8">
        <Image src="/form.png" width={40} height={40} alt="icon of a calendar"/>

        Create Address Form
        </a>
        }
        <a href="" className="flex items-center md:w-1/2 w-full px-3 py-4 cursor-pointer gap-4 
                    border rounded-md shadow-sm 
                   hover:bg-zinc-50 mt-4">
                    <Image src="/site.png" width={40} height={40} alt="icon of a calendar"/>
          Create Event site
        </a>
        <a href={`/addressbook/${eventURL}`} className="flex items-center md:w-1/2 w-full px-3 py-4 cursor-pointer gap-4 
                    border rounded-md shadow-sm 
                   hover:bg-zinc-50 mt-4">
                    <Image src="/site.png" width={40} height={40} alt="icon of a calendar"/>
          Check your addresess
        </a>
      </div>

    </div>
  )
}
