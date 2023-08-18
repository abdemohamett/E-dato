import React from 'react'
import DebtClient from './components/client'
import prismadb from '@/lib/prismadb'
import { DebtColumn } from '../../components/columns'

import {format} from 'date-fns'
import axios from 'axios'
import { formatter } from '@/lib/utils'
import { Debt } from '@prisma/client'

interface DebtProps{
  id: string;
  amount: string;
  item: string;
  createdAt: string;
}


const CustomerId = async({
    params
  }: {
    params: {debtId: string}
  }) => {
    const debts = await prismadb.debt.findMany({
      where: {
        customerId: params.debtId
      },
      orderBy: {
        createdAt: 'desc'
      }
  })
  
    const formattedCustomers: DebtProps[] = debts.map((item) => ({
      id: item.id,
      item: item.item,
      amount: formatter.format(item.amount.toNumber()),
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

  return (
    <div className='flex flex-col'>
    <div className="flex-1 space-x-4 p-8 pt-6">
      <DebtClient data={formattedCustomers}/>
    </div>
 </div>
  )
}

export default CustomerId