import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CircleDollarSign, DollarSign, Wallet, Wallet2 } from 'lucide-react'
import React from 'react'
import { BsArrowRightShort, BsPeople, BsPeopleFill } from 'react-icons/bs'

const SectionOne = () => {
  return (
    <div className='space-y-8'>
        
        {/* second  paragraph */}
        <div className='py-10 mb-10'>
            <Badge variant='premium'>
                Your own data
            </Badge>
        {/* <p className='md:text-md text-sm font-medium text-blue-700'>
           Y
        </p> */}
        <h1 className='md:text-3xl text-2xl font-bold max-w-lg mx-auto'>
        Everything you need to Create and Manage your own data
        </h1>
        <p className='text-zinc-400 font-light mt-4 md:max-w-md mx-auto text-md '>
        Record the data on your own now as easy as clicking a few buttons.</p>
        </div>


        {/* intro paragraph */}
        <div  className='mx-6 md:flex text-center md:gap-4 md:max-w-5xl md:mx-auto'>
            <div className='text-start mb-10'>
                <h1 className='text-bold text-md font-medium mb-3 flex items-center gap-2'>
                    <Wallet className="text-indigo-500"  size={20}  />
                    Expenses
                </h1>
                <p className='text-gray-400 text-sm font-thin'>To record expense just click Add new and put the item name and the price/amount of the item</p>
            </div>
            <div id='#how-it-works' className='text-start mb-10'>
                <h1 className='text-bold text-md font-medium mb-3 flex items-center gap-2'>
                    <BsPeople className="text-purple-500" size={20} />
                    Customers
                </h1>
                <p className='text-gray-400 text-sm font-thin'>Creating customers we made it easy as it never been just Add customer&apos;s name and phone number click create. DONE.</p>
            </div>
            <div className='text-start'>
                <h1 className='text-bold text-md font-medium mb-3 flex items-center gap-2'>
                    <CircleDollarSign className="text-pink-500" size={20} />
                    Debts
                </h1>
                <p className='text-gray-400 text-sm font-thin '>To record debt to an existing customer all you need todo is click the three dots then debts and add the debt to that customer</p>
            </div>
        </div>

         {/* paragraph in the box */}


         <div className='backdrop-blur-none md:m-[100px] md:border md:rounded-[20px] md:shadow-md border-gray-300 text-center'>
           <div className='p-[100px]'>
            <h1 className='md:text-3xl text-2xl font-bold max-w-lg mx-auto'>Ready to take your data Recording</h1>
            <h1 className='md:text-3xl text-2xl font-bold max-w-lg mx-auto'>to the next level?</h1>

            <h2 className='font-thin mt-4 max-w-lg mx-auto text-[16px] text-gray-400'>Create your own Data Recording dashboard and take over control over your data in real-time with E-dato software.</h2>
             <div className='flex flex-col items-center mt-5'>
            <Button variant='premium' className=''>
                Create Your Account Now
                <BsArrowRightShort size={24}/>
            </Button>
             </div>
           </div>
        </div>

    </div>
  )
}

export default SectionOne