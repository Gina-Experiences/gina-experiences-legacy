'use client'

import { Facebook, Instagram, Linkedin, Link, Mail, PhoneCall } from "lucide-react"

const SocialMediaLinks = [
   {
      icon: Facebook,
      username: 'Gina Experiences',
      href: 'https://www.facebook.com/ginaexperiences',
      color: 'ginaYellow'
   },
   {
      icon: Instagram,
      username: '@ginaexperiences',
      href: 'https://www.instagram.com/ginaexperiences/',
      color: 'ginaOrange'
   },
   {
      icon: Link,
      username: '@ginaexperiences',
      href: 'https://www.tiktok.com/@ginaexperiences',
      color: 'ginaGreen'
   },
   {
      icon: Linkedin,
      username: 'Gina Experiences',
      href: 'https://www.linkedin.com/company/ginaexperiences/',
      color: 'ginaBlue'
   },
]

const Contacts = [
   {
      icon: Mail,
      username: 'ginatravel.ph@gmail.com',
      href: 'mailto:ginatravel.ph@gmail.com?subject=Inquiry&body=Hello%20Team',
      color: 'ginaYellow'
   },
   {
      icon: PhoneCall,
      username: '+63 917 108 6757',
      href: 'tel:+63-917-108-6757',
      color: 'ginaOrange'
   }
]

export default function ContactLinks() {
   return (
      <div className="flex flex-col bg-ginaWhite w-full h-full shadow-lg items-start justify-center space-y-4 lg:rounded-3xl p-12 md:p-24">
         <span className="leading-none">Get in touch with
         <h1 className="text-3xl font-bold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">GINA EXPERIENCES</h1> </span>
         <p className="">Partner with Gina Experiences to create unforgettable adventures. Connect with us to explore collaboration opportunities and be part of our vibrant community.</p>
         <div className="lg:flex lg:space-x-8">
            <div className="flex flex-col space-y-2 mb-8">
               <h2 className="font-bold text-xl mb-2">Follow Us!</h2>
               {SocialMediaLinks.map((item, index) => {
                  const IconComponent = item.icon;
                  const handleCopyLink = () => {
                     navigator.clipboard.writeText(item.href)
                        .then(() => alert('Link copied to clipboard!'))
                        .catch(err => console.error('Failed to copy link:', err)); 
                  };
                  return (
                     <div key={index} className="flex items-center gap-2">
                        <a
                           href={item.href}
                           target="_blank"
                           className={`flex items-center gap-3`}
                        >
                           {IconComponent ? <IconComponent size={40} className={`bg-${item.color} text-ginaWhite p-2 rounded-full`}/> : <span>Icon not found</span>}
                           <span className="font-medium text-xs lg:text-base">{item.username}</span>
                        </a>
                        <button onClick={handleCopyLink}>
                           <Link className={`text-${item.color}`}></Link>
                        </button>
                     </div>
                  );
               })}
            </div>
            <div className="flex flex-col space-y-2">
               <h2 className="font-bold text-xl mb-2">Contact Us!</h2>
               {Contacts.map((item, index) => {
                  const IconComponent = item.icon;
                  const handleCopyLink = () => {
                     navigator.clipboard.writeText(item.href)
                        .then(() => alert('Link copied to clipboard!'))
                        .catch(err => console.error('Failed to copy link:', err)); 
                  };
                  return (
                     <div key={index} className="flex items-center gap-2">
                        <a
                           href={item.href}
                           target="_blank"
                           className={`flex items-center gap-3`}
                        >
                           {IconComponent ? <IconComponent size={40} className={`bg-${item.color} text-ginaWhite p-2 rounded-full`}/> : <span>Icon not found</span>}
                           <span className="font-medium text-xs lg:text-base">{item.username}</span>
                        </a>
                        <button onClick={handleCopyLink}>
                           <Link className={`text-${item.color}`}></Link>
                        </button>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   )
}