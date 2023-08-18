import prismadb from '@/lib/prismadb'
import ExpensesClient from './components/client'
import { ExpenseColumn } from './components/columns'

import {format} from 'date-fns'
import { formatter } from '@/lib/utils'

const Expenses = async({
  params
}: {
  params: {storeId: string}
}) => {
  const expenses = await prismadb.expense.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedExpenses: ExpenseColumn[] = expenses.map((item) => ({
    id: item.id,
    item: item.item,
    amount: formatter.format(item.amount.toNumber()),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
  <div className='flex flex-col'>
    <div className="flex-1 space-x-4 p-8 pt-6">
      <ExpensesClient data={formattedExpenses}/>
    </div>
 </div>
  )
}

export default Expenses