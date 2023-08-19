'use client'

import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import SectionOne from "./section-one";

const LandingHero = () => {
    const userData = useSession()
    const user = userData.data?.user
  return (
    <div className=" font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
      <h1>The Best Tool to Record</h1>
      <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
      <TypewriterComponent
            options={{
              strings: [
                "Expenses.",
                "Customers.",
                "Debts.",
              ],
              autoStart: true,
              loop: true,
            }}
          />

      </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create expenses. customers. debts, 10x faster.
      </div>
      <div>
        <Link href={user ? "/create" : "/auth"}>
          <Button variant='premium' className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Get Started For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
        
        {/* Video field */}
      <div className='-mt-8 lg:max-w-5xl md:max-w-full md:mx-auto mx-6 mb-8 py-10'>
        <video poster='/edato.gift.mp4' autoPlay muted loop src='/edato.gift.mp4' className="w-full h-full rounded-lg shadow-lg" />
        </div>

        {/* Paragraph section */}

      <SectionOne/>
    </div>
  )
}

export default LandingHero