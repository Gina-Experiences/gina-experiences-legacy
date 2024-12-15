import Form from "next/form";
import * as Dialog from "@radix-ui/react-dialog";
import { X, EyeOff, Eye } from "lucide-react";
import { useState } from "react";

const LoginPopup  = () => {
   const [email, setEmail] = useState("Email");
   const [password, setPassword] = useState("Password");
   const [passwordVisible, setPasswordVisible] = useState(false);

   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

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
         <Dialog.Trigger className="border border-ginaLightYellow text-ginaLightYellow hover:border-ginaOrange hover:text-ginaOrange duration-200 bg-ginaWhite rounded-lg w-24 p-1">
            Login
         </Dialog.Trigger>
         <Dialog.Title></Dialog.Title>
         <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 backdrop-blur-md"/>
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
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
                           <div className="w-full h-1/2 rounded-3xl bg-ginaBlue shadow-md"></div>
                           <img src="/images/newsletter/church.jpg" 
                           alt="Church"
                           className="object-cover object-center w-full h-full rounded-3xl" 
                           />
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col w-screen lg:w-1/2 p-8 text-center items-center text-ginaBlack justify-center space-y-8">
                     <h2 className="text-4xl font-bold lg:text-end bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)30%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">Welcome to <br />Gina Experiences!</h2>
                     <p className="text-sm text-ginaBlack font-medium">Begin planning your dream getaway with ease.</p>
                     <Form action="/" className="flex flex-col items-center justify-center w-5/6 space-y-2 lg:space-x-0">
                        <input type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => handleFocus(email, setEmail, "Email")}
                        onBlur={() => handleBlur(email, setEmail, "Email")}
                        className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"/>
                        <div className="relative w-full max-w-md">
                           <input 
                           type={passwordVisible ? "text" : "password"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           onFocus={() => handleFocus(password, setPassword, "Password")}
                           onBlur={() => handleBlur(password, setPassword, "Password")}
                           className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"/>
                           <div 
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                              onClick={togglePasswordVisibility}
                           >
                              {passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                           </div>
                        </div>
                     </Form>
                     <div className="flex space-x-4">
                        <button className="flex justify-center items-center rounded-xl px-8 py-2 text-sm text-ginaBlue  font-medium border border-2 border-ginaBlue hover:bg-ginaGray focus:ring focus:ring-ginaBlue/50 shadow-md">
                        Sign Up
                        </button>
                        <button className="flex justify-center items-center rounded-xl bg-ginaBlue px-10 py-2 text-white text-sm font-medium hover:bg-ginaBlue/80 focus:ring focus:ring-ginaBlue/50 shadow-md">
                        Login
                        </button>
                     </div>
                        <p className="text-ginaBlue text-sm cursor-pointer">Forgot Password?</p>
                  </div>
               </div>
            </Dialog.Content>
         </Dialog.Portal>
      </Dialog.Root>
   )
}

export default LoginPopup;