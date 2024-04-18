import React from 'react'

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col mt-8 container">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Service</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
            The following terms and conditions govern all use of the Havagala website and all content, services, 
            and products available at or through the website. Our services are offered subject to your acceptance 
            without modification of all of the terms and conditions contained herein and all other operating 
            rules, policies (including, without limitation, Havagala’s Privacy Policy), and procedures that may 
            be published from time to time by Havagala (collectively, the “Agreement”).
        </p>
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700">Acceptance of Terms</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                By accessing or using any part of the website, you agree to become bound by the terms and conditions 
                of this agreement. If you do not agree to all the terms and conditions of this agreement, then you 
                may not access the website or use any services. If these terms and conditions are considered an 
                offer by Havagala, acceptance is expressly limited to these terms.
            </p>
        </div>
        <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">Your Havagala Account</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                If you create an account on the website, you are responsible for maintaining the security of your 
                account, and you are fully responsible for all activities that occur under the account. You must 
                immediately notify Havagala of any unauthorized uses of your account or any other breaches of security. 
                Havagala will not be liable for any acts or omissions by you, including any damages of any kind incurred 
                as a result of such acts or omissions.
            </p>
        </div>
        <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">Responsibility of Contributors</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                If you operate an account, comment on a website, post material to the website, post links on the 
                website, or otherwise make (or allow any third party to make) material available by means of the 
                website (any such material, “Content”), you are entirely responsible for the content of, and any 
                harm resulting from, that Content. That is the case regardless of whether the Content in question 
                constitutes text, graphics, an audio file, or computer software.
            </p>
        </div>
    </div>
  )
}
