import React from 'react'
import DebtForm from './components/debt-form'
import prismadb from '@/lib/prismadb'

 const DebtID = async ({
    params
}: {
    params: {debtID: string}
}) => {
    const debt = await prismadb.debt.findUnique({
        where: {
            id: params.debtID
        }
    })
  return (
    <div className='flex flex-col'>
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <DebtForm initialData={debt}/>
   </div>
   </div>
  )
}

export default DebtID