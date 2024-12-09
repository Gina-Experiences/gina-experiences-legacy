import Form from "next/form";
import * as Dialog from "@radix-ui/react-dialog";
import { X, EyeOff } from "lucide-react";
import { useState } from "react";

const SignupPopup  = () => {
   const [firstName, setFirstName] = useState("First Name");
   const [lastName, setLastName] = useState("Last Name");
   const [contactNum, setContactNum] = useState("Contact Number");
   const [address, setAddress] = useState("Address");
   const [email, setEmail] = useState("Email");
   const [password, setPassword] = useState("Password");
   const [confirmPassword, setConfirmPassword] = useState("Confirm Password");
   
   const handleFocus = (
      field: string, 
      setValue: React.Dispatch<React.SetStateAction<string>>, 
      defaultValue: string
   ) => {
      if (field === defaultValue) {
         setValue("");
      }
   };

   const handleBlur = (
      field: string,
      setValue: React.Dispatch<React.SetStateAction<string>>,
      defaultValue: string
   ) => {
      if (field.trim() === "") {
         setValue(defaultValue); 
      }
   };

   return(
      <Dialog.Root>
         <Dialog.Trigger className="border border-ginaLightYellow text-ginaWhite bg-ginaLightYellow hover:border-ginaOrange hover:bg-ginaOrange duration-200 rounded-lg w-24 p-1">
            Sign Up
         </Dialog.Trigger>
         <Dialog.Title></Dialog.Title>
         <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 backdrop-blur-md"/>
            <Dialog.Content className="fixed
               top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <div className="flex lg:rounded-3xl w-screen max-w-screen-lg bg-ginaWhite lg:shadow-xl">
                  <Dialog.Close className="fixed right-0 m-8 cursor-pointer">
                     <X className="text-gray opacity-40 hover:opacity-100" />
                  </Dialog.Close>
                  <div className="hidden w-2/3 lg:flex flex-col items-center p-12 space-y-2">
                     <div className="flex w-full h-1/3 items-center justify-center space-x-2">
                        <div className="w-1/3 h-full rounded-3xl bg-ginaBlue"></div>
                        <img src="/images/newsletter/sunflower.jpg" 
                           alt="Sunflower"
                           className="object-cover object-center w-full h-full rounded-3xl" 
                           /> 
                        <div className="w-1/3 h-full rounded-3xl bg-ginaGreen"></div>
                     </div>
                     <div className="flex h-2/3 space-x-2">
                        <div className="flex flex-col w-1/2 h-full space-y-2">
                           <img src="/images/newsletter/tour.jpg" 
                           alt="Tour"
                           className="object-cover object-center w-full h-full rounded-3xl" 
                           />
                           <div className="w-full h-1/3 rounded-3xl bg-ginaYellow"></div>
                        </div>
                        <div className="flex flex-col w-1/2 h-full space-y-2">
                           <div className="w-full h-1/2 rounded-3xl bg-ginaOrange shadow-md"></div>
                           <img src="/images/newsletter/church.jpg" 
                           alt="Church"
                           className="object-cover object-center w-full h-full rounded-3xl" 
                           />
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col w-screen lg:w-1/2 p-8 text-center items-center text-ginaBlack justify-center space-y-8">
                     <h2 className="text-4xl font-bold lg:text-end bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)30%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">Start Your Next <br />Adventure!</h2>
                     <p className="text-sm text-ginaBlack font-medium">Begin planning your dream getaway with ease.</p>
                     <Form action="/" className="flex flex-col items-center justify-center w-5/6 space-y-2 lg:space-x-0">
                        <div className="flex space-x-2">
                           <input type="text" 
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                           onFocus={() => handleFocus(firstName, setFirstName, "First Name")}
                           onBlur={() => handleBlur(firstName, setFirstName, "First Name")}
                           className="flex w-full p-2 px-4 text-xs items-center text-ginaYellow border border-2 border-ginaYellow rounded-lg"/>
                           <input type="text" 
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                           onFocus={() => handleFocus(lastName, setLastName, "Last Name")}
                           onBlur={() => handleBlur(lastName, setLastName, "Last Name")}
                           className="flex w-full p-2 px-4 text-xs items-center text-ginaYellow border border-2 border-ginaYellow rounded-lg"/>
                        </div>
                        <input type="text" 
                        value={contactNum}
                        onChange={(e) => setContactNum(e.target.value)}
                        onFocus={() => handleFocus(contactNum, setContactNum, "Contact Number")}
                        onBlur={() => handleBlur(contactNum, setContactNum, "Contact Number")}
                        className="flex w-full p-2 px-4 text-xs items-center text-ginaYellow border border-2 border-ginaYellow rounded-lg"/>
                        <input type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onFocus={() => handleFocus(address, setAddress, "Address")}
                        onBlur={() => handleBlur(address, setAddress, "Address")}
                        className="flex w-full p-2 px-4 text-xs items-center text-ginaYellow border border-2 border-ginaYellow rounded-lg"/>
                        <input type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => handleFocus(email, setEmail, "Email")}
                        onBlur={() => handleBlur(email, setEmail, "Email")}
                        className="flex w-full p-2 px-4 text-xs items-center text-ginaYellow border border-2 border-ginaYellow rounded-lg"/>
                        <div className="relative w-full max-w-md">
                           <input type="text"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           onFocus={() => handleFocus(password, setPassword, "Password")}
                           onBlur={() => handleBlur(password, setPassword, "Password")}
                           className="flex w-full p-2 px-4 text-xs items-center text-ginaYellow border border-2 border-ginaYellow rounded-lg"/>
                           {/* <EyeOff /> */}
                        </div>
                        <div className="relative w-full max-w-md">
                           <input type="text"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           onFocus={() => handleFocus(confirmPassword, setConfirmPassword, "Confirm Password")}
                           onBlur={() => handleBlur(confirmPassword, setConfirmPassword, "Confirm Password")}
                           className="flex w-full p-2 px-4 text-xs items-center text-ginaYellow border border-2 border-ginaYellow rounded-lg"/>
                           {/* <EyeOff /> */}
                        </div>
                     </Form>
                     <div className="flex space-x-4">
                        <Dialog.Close className="flex justify-center items-center rounded-xl px-8 py-2 text-sm text-ginaYellow  font-medium border border-2 border-ginaYellow hover:bg-ginaGray focus:ring focus:ring-ginaOrange/50 shadow-md">
                        Sign Up
                        </Dialog.Close>
                        <Dialog.Close className="flex justify-center items-center rounded-xl bg-ginaYellow px-10 py-2 text-white text-sm font-medium hover:bg-ginaYellow/80 focus:ring focus:ring-ginaOrange/50 shadow-md">
                        Login
                        </Dialog.Close>
                     </div>
                        <p className="text-ginaYellow text-sm cursor-pointer">Already have an account? Login here!</p>
                  </div>
               </div>
            </Dialog.Content>
         </Dialog.Portal>
      </Dialog.Root>
   )
}

export default SignupPopup;