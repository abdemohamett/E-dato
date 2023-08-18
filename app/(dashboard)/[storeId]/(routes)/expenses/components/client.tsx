'use client'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Expense } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ExpenseColumn, columns } from './columns'

interface ExpensesClientProps{
  data: ExpenseColumn[]
}

const ExpensesClient: React.FC<ExpensesClientProps> = ({
  data
}) => {
    const params = useParams()
    const router = useRouter()
  return (
  <>
    <div className="flex items-center justify-between mb-3">
    <Heading
     title={`Expenses (${data.length})`}
     description='Manage your expenses.'
     />
    <Button  onClick={() => router.push(`/${params.storeId}/expenses/new`)}>
      <Plus className='mr-2 h-4 w-4'/>
      Add New
    </Button> 
    </div>
    <Separator/>
    <DataTable searchKey='item' columns={columns} data={data}/>
  </>
  )
}

export default ExpensesClient