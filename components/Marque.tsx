"use client"
import React from 'react'
import { motion } from 'framer-motion';
function Marque({className, duration}:{className:string, duration:number}) {
    const words = ["SNAPLINK", "MICROSITE", "CUSTOM LINK", "MANAGE"];
  return (


    <div className={`overflow-hidden flex items-center justify-center whitespace-nowrap ${className}`}>
        <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{  ease: 'linear', duration, repeat: Infinity }}
            className="flex items-center"
        >
            {words.map((word, index) => (
                <React.Fragment key={index}>
                    <span className="px-4 text-[50px] ">{word}</span>
                    {index < words.length - 1 && <span className="px-2 -z-1 text-[50px] ">&bull;</span>}
                </React.Fragment>
            ))}
            
        </motion.div>
    </div>

    );
  
}

export default Marque