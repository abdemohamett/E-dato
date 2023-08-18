'use client'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { ChevronLeft, Edit, MoreHorizontal, Plus, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { DebtColumn } from '../../../components/columns'

import { CreditCard, Package } from "lucide-react"
import { DollarSign } from "lucide-react"

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger 
 } from "@/components/ui/dropdown-menu"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Debt } from '@prisma/client'
import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/modals/alert-modal'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface DebtClientProps{
    data: {  
      id: string;
      amount: string;
      item: string;
      createdAt: string;
    }[];
}

const DebtClient: React.FC<DebtClientProps> = ({
    data,
}) => {
    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // const onDelete = async () => {
    //   try {
    //     setLoading(true);
    //     await axios.delete(`/api/${params.storeId}/debts/${params.debtId}/debt/${}`);
    //     router.refresh();
    //     router.push(`/${params.storeId}/debts/${params.debtId}/debt`)
    //     toast.success('Debt deleted.');
    //   } catch (error: any) {
    //     toast.error('Somthing went wrong');
    //   } finally {
    //     setLoading(false);
    //     setOpen(false);
    //   }
    // }

  return (
    <>
  {/* <AlertModal
   isOpen={open}
   onClose={() => setOpen(false)}
   onConfirm={onDelete}
   loading={loading}
   /> */}
     <div className="flex items-center mb-3">
      <Button onClick={() => router.push(`/${params.storeId}/debts`)} className='mr-4' variant={'outline'} size={'icon'}>
        <ChevronLeft/>
      </Button>
    <Heading
     title={`Total Debts (${data.length})`}
     description='Track debts.'
     />
    <Button className='ml-auto'  onClick={() => router.push(`/${params.storeId}/debts/${params.debtId}/debt/new`)}>
      <Plus className='mr-2 h-4 w-4'/>
      Add Debt
    </Button>
    </div>
    <Separator/>
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8">
          {data.map((item) => (
        <Card key={item.id}>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
           <CardTitle className="text-sm font-medium">
                {item.createdAt}
            </CardTitle>
           <CardTitle className="text-sm text-muted-foreground" >
           {item.amount}
            </CardTitle>
            {/* <p ></p> */}
          </CardHeader>  
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardContent >
            <div className="text-2xl font-bold">{item.item}</div>
          </CardContent>
          <CardContent >
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className="h-8 w-8 p-0">
         <span className="sr-only">Open Menu</span>
         <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
         <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/debts/${params.debtId}/debt/${item.id}`)}>
            <Edit className="mr-2 h-4 w-4"/>
            Edit
         </DropdownMenuItem>

         {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4"/>
            Delete
         </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
            {/* <Button onClick={() => router.push(`/${params.storeId}/debts/${params.debtId}/debt/${item.id}`)} variant='ghost' >
              <Edit size={16}/>
            </Button> */}
          </CardContent>
          </div>
        </Card>
        ))}
     </div>
    </>
  )
}

export default DebtClient