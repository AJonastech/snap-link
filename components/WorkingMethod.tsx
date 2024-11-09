"use client"
import React from 'react'
import stepOne from "@/app/images/proto_step_1.png"
import Image from 'next/image';
import {motion} from "framer-motion"
import { ArrowRightIcon } from 'lucide-react';
function WorkingMethod() {
  const steps = [
    { title: "Enter link", image: stepOne },
    { title: "Click shortener", image: stepOne },
    { title: "Create custom URL", image: stepOne},
    { title: "Create QR code", image: stepOne },
    { title: "Put tracker link", image: stepOne },
  ];

  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <section className="bg-arsenic py-16">
      <div className="container mx-auto">
     <div className="flex justify-between mt-12 items-center mb-16">
       <h2 className="text-[40px] font-bold text-white">SHORTEN YOUR LINK NOW</h2>
       <div className="relative max-w-md w-full">
         <input
           type="text"
           placeholder="Enter your link here"
           className="w-full py-5 px-4 pr-24 rounded-xl bg-[#444d55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
         />
         <button
           className="absolute inline-flex items-center right-2 px-4 py-3 font-medium top-1/2 -translate-y-1/2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors group"
         >
           Short Link <ArrowRightIcon className='ml-2 transition-transform group-hover:translate-x-1'/>
         </button>
       </div>
 
     </div>

     <div className='flex border-t pt-[75px] border-[#444d55] justify-between'>
     <h2 className="text-[40px] font-bold text-white mb-8 ">HOW WE WORK 👇</h2>
        <p className='text-muted-gray font-medium max-w-[550px]'>
            All the products you need to build brand connections, manage links and QR codes, and connect with audiences everywhere, in a single unified platform
        </p>
     </div>
        <div className="w-full">
          <div className="relative w-full bg-[#444d55] p-4 rounded-3xl mb-4 flex">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 py-4 px-4 text-lg font-medium transition-all ${
                  activeTab === index
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="inline-flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  {step.title}
                </span>
              </button>
            ))}
            <div
              className="absolute bottom-0 h-1 bg-primary transition-all duration-300 ease-in-out"
              style={{
                left: `${(activeTab / steps.length) * 100}%`,
                width: `${100 / steps.length}%`,
              }}
            />
          </div>
          <br/>
          <br/>
          <motion.div 
            className="w-full mt-5"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={steps[activeTab].image.src}
                width={500}
                height={400}
                alt={steps[activeTab].title}
                className="w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WorkingMethod