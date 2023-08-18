'use client'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { DebtColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { Customer } from '@prisma/client'

interface DebtsClientProps{
    data: DebtColumn[]
}

const DebtsClient: React.FC<DebtsClientProps> = ({
    data,
}) => {
    const params = useParams()
    const router = useRouter()
  return (
    <>
    <div className="flex items-center justify-between mb-3">
    <Heading
     title={`Customers (${data.length})`}
     description='Manage your customers.'
     />

    <Button  onClick={() => router.push(`/${params.storeId}/debts/new`)}>
      <Plus className='mr-2 h-4 w-4'/>
      Add New
    </Button> 
     </div>
     <Separator/>
    <DataTable  searchKey='name' columns={columns} data={data}/>
    </>
  )
}

export default DebtsClient