import React from 'react'

export default function Footer() {
  return (
    <footer className="p-4 border-t border-gray-200 mt-12 bg-white text-gray-600">
    <div className="container mx-auto flex md:flex-row flex-col flex-wrap justify-between">
        <div className="flex flex-row items-center">
     
            <span className="text-xl font-semibold whitespace-nowrap">Havagala</span>
            <div className="text-center flex">
                <a href="https://facebook.com/havagala" className="mx-2">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  
                    stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                    </svg>
                </a>
                <a href="https://twitter.com/havagala" className="mx-2">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
                    className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" />
                    </svg>
                </a>
            </div>
           
        </div>
        <div className="flex flex-col md:flex-row mt-4 lg:mt-0 gap-4">
            <a href="/about">
                About Us
            </a>
            <a href="/terms">
                Terms of Service
            </a>
            <a href="/privacy">
                Privacy Policy
            </a>
            
        </div>
    </div>
    <div className="text-center text-xs mt-4">
        © 2024 Nidosoft Development. All rights reserved.
    </div>
    
</footer>

  )
}
