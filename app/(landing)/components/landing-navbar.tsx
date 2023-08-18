'use client'

import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const font = Montserrat({ weight: '600', subsets: ['latin'] });


const Navbar = () => {
    const userData = useSession()
    const user = userData.data?.user
  return (
    <div className=" w-full">
    <nav className=' p-4 px-4 border-b backdrop-blur-2xl flex items-center justify-between'>
       <Link href='/' className='flex items-center'>
        {/* <div className="relative h-8 w-8 mr-4">
         <Image fill alt="Logo" src="/logo.png" />
        </div> */}
        <h1 className={cn("text-2xl font-bold", font.className)}>
          E-dato
        </h1>
       </Link>  
       <div className="flex items-center gap-x-4">
       <ThemeToggle/>
        <Link href={user ? '/create' : '/auth'}>
        <Button variant='premium' className="">
            {user ? 'Dashboard' : 'Get Started'}
        </Button>
        </Link>
       </div>
    </nav>
    </div>
  )
}

export default Navbar