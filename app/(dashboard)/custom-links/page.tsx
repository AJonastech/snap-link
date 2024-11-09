import React from 'react'
import Page from './_components/Page'
import { trpc } from '@/trpc/server'

async function  page() {

await trpc.links.fetchLinks.prefetch({
    page: 1,
    limit: 5
})
  return (
    
    <Page/>
  )
}

export default page