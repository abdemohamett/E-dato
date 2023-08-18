import React from 'react'
import DebtForm from './components/debt-form'
import prismadb from '@/lib/prismadb'

const DebtId = async ({
    params
}: {
    params: {debtId: string}
}) => {
    const expense = await prismadb.customer.findUnique({
        where: {
            id: params.debtId
        }
    })
  return (
    <div className='flex flex-col'>
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <DebtForm initialData={expense}/>
   </div>
   </div>
  )
}

export default DebtId