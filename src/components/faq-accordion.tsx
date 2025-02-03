"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface AccordionItemProps {
   question: string
   answer: string
   isOpen: boolean
   onToggle: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onToggle }) => {
   return (
      <div className="border-b border-ginaBlack">
         <button
            className="flex justify-between items-center w-full py-4 px-2 md:px-6 text-left"
            onClick={onToggle}
         >
            <span className="font-medium">{question}</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} />
         </button>
         {isOpen && (
            <div className="py-4 px-2 md:px-6">
               <p className="text-ginaGreen italic">{answer}</p>
            </div>
         )}
      </div>
   )
}

interface AccordionProps {
   items: AccordionItemProps[]
   allOpen: boolean
   onToggleItem: (index: number) => void
}

const Accordion: React.FC<AccordionProps> = ({ items, allOpen, onToggleItem }) => {
   return (
      <div className="p-8 md:p-12 h-full flex flex-col space-y-2">
         {items.map((item, index) => (
            <AccordionItem key={index} {...item} isOpen={allOpen || item.isOpen} onToggle={() => onToggleItem(index)} />
         ))}
      </div>
   )
}

interface AccordionFAQProps {
   id: string
   data: { id: number, faq: { question: string, answer: string }[] }[]
}

const AccordionFAQ: React.FC<AccordionFAQProps> = ({ id, data }) => {
   const [allOpen, setAllOpen] = useState(false)
   const [shuffledData] = useState(() => {
      const selectedAccordionData = data.find(data => data.id === Number(id))
      return selectedAccordionData ? selectedAccordionData.faq.sort(() => 0.5 - Math.random()) : []
   })
   const [itemStates, setItemStates] = useState(shuffledData.map(() => false))

   const handleToggleItem = (index: number) => {
      setItemStates(prev => {
         const newStates = [...prev]
         newStates[index] = !newStates[index]
         return newStates
      })
   }

   const handleToggleAll = () => {
      setAllOpen(prev => !prev)
   }

   return (
      <div>
         {allOpen && (
            <button
               className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
               onClick={handleToggleAll}
            >
               Minimize All
            </button>
         )}
         <Accordion
            items={shuffledData.map((item, index) => ({
               question: item.question,
               answer: item.answer,
               isOpen: itemStates[index],
               onToggle: () => handleToggleItem(index)
            }))}
            allOpen={allOpen}
            onToggleItem={handleToggleItem}
         />
      </div>
   )
}

export default AccordionFAQ
