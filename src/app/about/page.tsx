import React from 'react'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col mt-8 container">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
            Havagala is dedicated to transforming the way you plan and organize your events. 
            Founded in 2024, our mission has been to provide innovative and affordable solutions 
            that streamline the process of gathering addresses, creating event websites, and integrating 
            online registries.
        </p>
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700">Our Vision</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                To be the leading provider of event management solutions, empowering users to create memorable and effective events with ease.
            </p>
        </div>
        <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">Our Team</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                At Havagala, our team is made up of passionate professionals from the tech and event planning industries, dedicated to ensuring that your event planning experience is seamless and stress-free.
            </p>
        </div>
        <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">Contact Us</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                Need to get in touch? Contact us at <a href="mailto:hello@havagala.com" className="text-blue-500">hello@havagala.com</a> or call us at (123) 456-7890.
            </p>
        </div>
    </div>
  )
}
