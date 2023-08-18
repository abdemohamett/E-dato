import React from 'react'
import DebtsClient from './components/client'
import prismadb from '@/lib/prismadb'
import { DebtColumn } from './components/columns'
import {format} from 'date-fns'
import { Customer } from '@prisma/client'


const Customers = async({
  params
}: {
  params: {storeId: string}
}) => {
  const customers = await prismadb.customer.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedCustomers: DebtColumn[] = customers.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    // total: item.total
    // amount: formatter.format(item.amount.toNumber()),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className='flex flex-col'>
    <div className="flex-1 space-x-4 p-8 pt-6">
      <DebtsClient data={formattedCustomers}/>
    </div>
 </div>
  )
}

export default Customers