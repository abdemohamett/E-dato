import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleDollarSign, DollarSign } from 'lucide-react'
import { getTotalExpenses } from '@/app/actions/get-total-expenses'
import { formatter } from '@/lib/utils'
import { getTotalCustomers } from '@/app/actions/get-total-customers'
import { BsPeople, BsPeopleFill } from 'react-icons/bs'
import { getTotalDebts } from '@/app/actions/get-total-debts'
import { Overview } from '@/components/overview'
import { getGraphRevenue } from '@/app/actions/get-graph-revenue'


interface DashboardPageProps {
  params: {storeId: string}
}


const DashboardPage: React.FC<DashboardPageProps> = async({
  params
}) => {
  const totalExpense = await getTotalExpenses(params.storeId)
  const graphRevenue = await getGraphRevenue(params.storeId);
  const totalCustomers = await getTotalCustomers(params.storeId)
  const totalDebts = await getTotalDebts(params.storeId)

  return (
    <div className="flex flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
    <Heading title="Dashboard" description="Overview of your Business" />
    <Separator/>
     <div className="grid gap-4 grid-cols-3">
     <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
           <CardTitle className="text-sm font-medium">
                Total Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>  
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(totalExpense)}</div>
          </CardContent>
        </Card>
     <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
           <CardTitle className="text-sm font-medium">
                Total Customers
            </CardTitle>
            <BsPeopleFill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>  
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
     <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
           <CardTitle className="text-sm font-medium">
                Total Debts
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>  
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(totalDebts)}</div>
          </CardContent>
        </Card>
     </div>
     <Card className="col-span-4">
         <CardHeader>
            <CardTitle>Overview</CardTitle>
         </CardHeader>
         <CardContent className="pl-2">
           <Overview data={graphRevenue}/>
         </CardContent>
        </Card>
    </div>
    </div>
  )
}

export default DashboardPage