import { LucideIcon, User } from 'lucide-react'
import React from 'react'

interface TserviceCard{
    title:string;
    description:string;
    Icon: LucideIcon
}
function ServiceCard({
title,
description,
Icon
}:TserviceCard) {
  return (
    <div className='w-full flex justify-between  p-8 bg-cultured rounded-2xl'>
        <div>
            <h4 className='font-black  text-3xl'>
                {title}
            </h4>
            <p className='text-muted-gray font-medium'>

               {description}
            </p>
        </div>
        <span className='inline-flex  h-10 w-10 items-center justify-center rounded-full bg-primary'>
   <Icon  size={20} className='text-white'/>
        </span>
    </div>
  )
}

export default ServiceCard