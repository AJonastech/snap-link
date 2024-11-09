import { renderScreenshotWithPuppeteer } from "@/lib/puppeteer";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // do not cache
    unstable_noStore();

    // parse request and get the website URL to render
    const data = (await request.json()) as { url: string };

    // get the screenshot
    const screenshot = await renderScreenshotWithPuppeteer(data.url);

    // return the image
    return new NextResponse(screenshot, {
        headers: { "content-type": "image/jpeg" },
    });
}