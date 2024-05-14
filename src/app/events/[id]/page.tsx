"use client"
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Back from '@/app/components/Back'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useUser } from '../../components/context/UserContext'
import { getEventById } from '../../server_layer/event'
import { Event } from '../../components/interfaces/interfaces'
import { getEventForm } from '../../server_layer/event';
import Image from 'next/image'
import { CustomSpinner } from '@/app/components/customSpinner';
import CopyToClipBoard from "../../components/copyToClipboard";
export default function page() {
  
  const [event, setEvent] = useState<Event | any>(undefined)
  const [form, setForm] = useState<any>(undefined)
  const [loading, setloading] = useState(true);
  const baseUrl = window.location.origin
  const router = useRouter()
  const params = useParams()
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const eventURL: string = typeof params.id === 'string' ? params.id : '';

  useEffect(()=> {
    const fetchEvent = async ()=> {
      const result = await getEventById(eventURL)
      setEvent(result)
      setloading(false)
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
  

  return (
    <div className='container mt-8 min-h-screen'>
      <Back url={"/events"}/>
      
      {loading?<CustomSpinner/>:
      <>
     
          <div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
              <ModalBody>
                <p> 
                  Are you sure you want to delete this event? This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" className="text-black" onPress={onClose}>
                    Delete event
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            <h1 className='text-3xl font-bold'>{event?.eventName}</h1>
            {event?.eventDate&&
            <h2>{
              `${new Intl.DateTimeFormat('en-US', {month: 'long', day: "numeric", year:"numeric"}).format(new Date(`${event?.eventDate}T00:00`))}`
            }</h2>
            }
          </div>
          <div>
            {form ?
            <div className="mt-8">
              <CopyToClipBoard text={`${baseUrl}/form/${eventURL}`} name=""/>
              <div>
                <a
                  className='px-4 py-2 bg-primary text-black rounded block mt-4 w-fit text-xs' 
                  href={`/form/${eventURL}`}>
                  Open Address Form
                </a>
              </div>
              <a href={`/form/edit/${event?.eventURL}`} className="flex items-center md:w-1/2 w-full px-3 py-4 cursor-pointer gap-4 
                        border rounded-md shadow-sm 
                      hover:bg-zinc-50 mt-4">
              <Image src="/form.png" width={40} height={40} alt="icon of a calendar"/>
              
              Edit Address Form 
              
              </a>
            </div>:
            <a href={`/newform/${event?.eventURL}`} className="flex items-center md:w-1/2 w-full px-3 py-4 cursor-pointer gap-4 
            border rounded-md shadow-sm 
          hover:bg-zinc-50 mt-8">
            <Image src="/form.png" width={40} height={40} alt="icon of a calendar"/>

            Create Address Form
            </a>
            }
            {/* <a href="" className="flex items-center md:w-1/2 w-full px-3 py-4 cursor-pointer gap-4 
                        border rounded-md shadow-sm 
                      hover:bg-zinc-50 mt-4">
                        <Image src="/site.png" width={40} height={40} alt="icon of a calendar"/>
              Create Event site
            </a> */}
            <a href={`/addressbook/${eventURL}`} className="flex items-center md:w-1/2 w-full px-3 py-4 cursor-pointer gap-4 
                        border rounded-md shadow-sm 
                      hover:bg-zinc-50 mt-4">
                        <Image src="/pin.webp" width={40} height={40} alt="icon of a calendar"/>
              Your addresess
            </a>
          </div>
          <div>
          <Button className="mt-4 flex gap-3 items-center bg-red-100 text-red-600 text-sm px-4 py-2 rounded-md" onPress={onOpen}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              Delete Event

            </Button>
           
          </div>
      </>
      }






    </div>
  )
}
