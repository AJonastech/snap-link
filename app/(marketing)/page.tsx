import Navbar from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Box, CalendarDays, Link2, Link2Icon, Lock, Server, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import qrcode from "../images/qr_code.png"
import product_demo from "../images/product_demo.png"
import Marque from "@/components/Marque";
import ServiceCard from "@/components/ServiceCards";
import WorkingMethod from "@/components/WorkingMethod";

const serviceOverview = [
  {
    title: "100k",
    description: "Active User",
    Icon: User
  },
  {
    title: "500+",
    description: "Integration",
    Icon: Box
  },
  {
    title: "50k",
    description: "Linl Created Monthly",
    Icon: Link2Icon
  },
  {
    title: "99%",
    description: "Uptime Server",
    Icon: Server
  }
]
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <section className="container mx-auto py-12 flex justify-between w-full">
        <div className=" flex flex-col gap-y-5 max-w-[500px]">
          <div>
            <p className="text-primary bg-floral-white rounded-full px-4 py-2 font-medium inline-block">
              Let&apos;s make with simply one click. 👈
            </p>
          </div>
          <div>
            <h1 className="text-[58px] leading-[70px] tracking-tight font-bold">
              BIO LINK & LINK       </h1>
            <h1 className="text-[58px] leading-[70px] tracking-tight font-bold"> SHORTENER <span className="inline-flex h-fit mb-1 px-1 py-2 rounded-lg bg-primary"><Link2 size={30} className="inline text-white " /></span> FOR</h1>
            <h1 className="text-[58px] leading-[70px] tracking-tight font-bold">
              BUSINESS NEEDS
            </h1>

          </div>

          <p className="text-gray-500">

            On a single platform, you'll find all the tools you need to connect audiences worldwide, manage links and QR Codes, and create brand relationships.

          </p>
          <div className="flex gap-x-3">
            <Link href="/login" className={"font-semibold py-4 text-white bg-primary px-8 rounded-lg"}>
              Get Started For Free
            </Link>
            <Link href="#" className="bg-white border-[2px] border-primary rounded-lg px-8 py-4 font-semibold text-primary">
              Get a Quote
            </Link>
          </div>
        </div>
        <div className="flex  max-w-[480px] flex-col gap-y-4">
          <div className="border-[2px] relative border-cultured rounded-lg p-5">
            <div className="flex mb-3 justify-between items-center">
              <p className="font-bold">
                QR CODE
              </p>
              <Button className="rounded-lg font-semibold">
                Download PNG
              </Button>
            </div>
            <div className="flex  gap-x-2 items-center">
              <Image alt="Qr_code" src={qrcode} className="w-[150px] bg-cover aspect-square h-[150px]" />
              <ul className="flex flex-col gap-y-2">
                <li className="flex items-center gap-x-2">
                  <Link2 className="text-primary" /> <p>https://www.business.com/test</p>
                </li>
                <li className="flex items-center gap-x-2">
                  <CalendarDays className="text-primary" /> <p>22 October 2024</p>
                </li>

              </ul>
            </div>
            <span className="inline-flex right-8 -bottom-[40px] w-[60px] h-[60px] rounded-full absolute   items-center justify-center bg-primary"><Link2 size={30} className="inline text-white " /></span>
          </div>
          <div className="border-[2px] border-cultured rounded-lg p-5">
            <div className="mb-3">
              <p className="font-bold">
                CUSTOM YOUR LINK
              </p>

            </div>
            <div>
              <Image alt="Qr_code" src={product_demo} className="w-full mb-3 rounded-lg bg-cover aspect-square h-[250px]" />
              <ul className="border-[1px] rounded-lg p-3 border-cultured">
                <li className="flex items-center gap-x-2">
                  <Link2 className="text-primary" /> <p><span className="text-primary">snap.link</span>/test</p>
                </li>


              </ul>
            </div>
          </div>

        </div>

      </section>
      <section className="w-full ">
        <div className="relative">
          <Marque duration={20} className="bg-primary absolute z-[999] -bottom-[6vh] mt-4 top-0 text-white h-[15vh] w-[105vw]  mx-auto origin-bottom-left " />
          <Marque duration={10} className="bg-arsenic  h-[15vh] z-1 text-[#9ca5b0] w-[105vw]  mx-auto -rotate-3 origin-bottom-left " />
<WorkingMethod/>
        </div>
      </section>

      {/* section for company that trusts us */}
      {/* <section>
        <h1>
          COMPANY THAT TRUST US
        </h1>
        <p>
          We are already being used by more than 8000 companies. We hyelp businesses, influencers, and creative individuals create a professional presence on the web without the neeed for technical skills.
        </p>
      </section> */}
      <section className="grid gap-5 container place-content-center mx-auto h-[70vh] grid-cols-3 w-full">
        <div className="col-span-2 flex flex-col gap-12">
          <h2 className="text-[40px] font-bold">
            WHY USE OUR SERVICE

          </h2>
          <div className="grid grid-cols-2 gap-5">
            {
              serviceOverview.map((service, id) => (
                <ServiceCard
                  key={id}
                  title={service.title}
                  description={service.description}
                  Icon={service.Icon}

                />
              ))
            }

          </div>
        </div>
        <div className="flex flex-col gap-12">
          <p className="text-muted-gray font-medium">
            Our platform was built to help you make every point of connection between your content and your audience ignite action.
          </p>
          <div className="w-full p-8 flex flex-col justify-between rounded-2xl bg-primary h-full">

            <span className="inline-flex  h-10 w-10 items-center justify-center rounded-full bg-white">   <Lock size={20} className="text-primary" /></span>
            <p className="text-3xl font-semibold text-white">
              SSL and redirection url without any worries.
            </p>
          </div>
        </div>

      </section>
      <footer className="bg-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4">SnapLink</h3>
              <p className="text-gray-600 mb-4">Create, share, and manage your custom links with ease.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Services</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Link Shortening</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Custom URLs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Analytics</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">API Access</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600 mb-2">123 SnapLink Street</p>
              <p className="text-gray-600 mb-2">City, State 12345</p>
              <p className="text-gray-600 mb-2">Email: info@snaplink.com</p>
              <p className="text-gray-600">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">&copy; 2023 SnapLink. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
