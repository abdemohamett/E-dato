import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { BsTwitter } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className=' flex flex-col items-center justify-center'>
      <Link href={'https://twitter.com/abdeMohamett'}>
        <Button variant='link' className='gap-x-2'>
            <BsTwitter size={20}/>
                Follow us on Twitter/X
        </Button>
        </Link>
        <p className='text-gray-400 text-sm font-medium mt-4 mb-16'>abdemohamett@gmail.com</p>
    </div>
  )
}

export default Footer