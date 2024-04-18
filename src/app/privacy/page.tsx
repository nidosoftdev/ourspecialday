import React from 'react'

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col mt-8 container">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
            At Havagala, your privacy is of utmost importance to us. This privacy policy document outlines the types 
            of personal information that is received and collected by Havagala and how it is used.
        </p>
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700">Information Collection And Use</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                We collect several different types of information for various purposes to provide and improve our 
                Service to you. These include personal information such as your name, email address, and telephone number, 
                used to ensure seamless service delivery and customer support.
            </p>
        </div>
        <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">Log Data</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                Like many site operators, we collect information that your browser sends whenever you visit our site 
                ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") 
                address, browser type, browser version, the pages of our site that you visit, the time and date of 
                your visit, the time spent on those pages and other statistics.
            </p>
        </div>
        <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                We use cookies and similar tracking technologies to track the activity on our service and hold certain 
                information. Cookies are files with a small amount of data which may include an anonymous unique identifier. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
                if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
        </div>
        <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">Security</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                The security of your Personal Information is important to us, but remember that no method of transmission 
                over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially 
                acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>
        </div>
        <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">Changes To This Privacy Policy</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
                Havagala may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any 
                changes.
            </p>
        </div>
    </div>
  )
}
