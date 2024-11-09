import React from 'react';
import { HydrateClient, trpc } from '@/trpc/server';
import { redirect } from 'next/navigation';
import UnlockLinkForm from '@/components/UnlockLinkForm';
import { headers } from 'next/headers';
import UAParser from 'ua-parser-js';


async function getLocation() {
  const headersList = headers();
  const ip = (headersList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    if (!data) {
      return 'unknown';
    }
    return `${data.city ?? "unknown"}, ${data.country ?? 'unknown'}`;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
}

function getDeviceInfo(userAgent: string) {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  return {
    deviceType: result.os.name || 'unknown',
    browserName: result.browser.name || 'unknown',
    osName: result.os.name || 'unknown',
  };
}

async function page({ params }: { params: { custom_id: string } }) {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const deviceInfo = getDeviceInfo(userAgent);
  if(!params.custom_id) {
    return null
  }
  const fetchLink = await trpc.links.fetchLinkDetail({ customId: params.custom_id });
  if (!fetchLink.data) return null;
  const location = await getLocation()
  if (!fetchLink.data.isPasswordProtected) {
    const location = await getLocation();


    await trpc.links.registerClick({
      customId: params.custom_id,
      location: location || 'Unknown',
      device: deviceInfo.deviceType,
    });

    if (fetchLink.data.originalUrl) {
      redirect(fetchLink.data.originalUrl);
    }
  }

  return (
    <HydrateClient>
      <div>

        {fetchLink.data.isPasswordProtected && <UnlockLinkForm deviceType={deviceInfo.deviceType} location={location ?? 'unknown'} />}
      </div>
    </HydrateClient>
  );
}

export default page;