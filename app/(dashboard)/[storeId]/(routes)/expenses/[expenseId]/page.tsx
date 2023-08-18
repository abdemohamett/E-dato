import React from 'react'
import ExpenseForm from './components/expense-form'
import prismadb from '@/lib/prismadb'

const ExpenseId =  async ({
    params
}: {
    params: {expenseId: string}
}) => {
    const expense = await prismadb.expense.findUnique({
        where: {
            id: params.expenseId
        }
    })
  return (
    <div className='flex flex-col'>
     <div className='flex-1 space-y-4 p-8 pt-6'>
       <ExpenseForm initialData={expense}/>
    </div>
    </div>
  )
}

export default ExpenseId