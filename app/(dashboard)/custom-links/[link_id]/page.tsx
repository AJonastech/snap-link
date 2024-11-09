import React from 'react'
import LinkDetails from './_components/LinkDetails'
import { trpc } from '@/trpc/server'

async function page({
  params,
}: {
  params: Promise<{ link_id: string }>
}) {
  const link_id = (await params).link_id
  await trpc.links.fetchLinkDetail.prefetch({
    customId: link_id
  })
  await trpc.clicks.fetchLinkClicks.prefetch({
    customId: link_id,
    page: 1,
    limit:5
  })
  return (
    <LinkDetails />
  )
}

export default page