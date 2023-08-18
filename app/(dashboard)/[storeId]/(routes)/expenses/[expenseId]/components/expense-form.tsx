'use client'

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { Expense } from "@prisma/client"
import AlertModal from "@/components/modals/alert-modal"

const formSchema = z.object({
    item: z.string().min(1),
    amount: z.coerce.number().min(1),
})
  
type ExpenseFormValue = z.infer<typeof formSchema>

interface ExpenseFormProps {
    initialData: Expense | null
  }

const ExpenseForm: React.FC<ExpenseFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? 'Edit Expense' : 'Record expense'
    const description = initialData ? 'Edit a expense' : 'Record a new expense'
    const toastMessage = initialData ? 'Expense updated.' : 'Expense recorded.'
    const action = initialData ? 'Save changes' : 'Record'
    
    const form = useForm<ExpenseFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            amount: parseFloat(String(initialData?.amount)),
          } : {
          item: '',
          amount: 0
        }
      })


    const onSubmit = async (data: ExpenseFormValue) => {
        try {
          setLoading(true)
          if(initialData){
    
            await axios.patch(`/api/${params.storeId}/expenses/${params.expenseId}`, data);
          }else{
            await axios.post(`/api/${params.storeId}/expenses`, data);
          }
          router.refresh();
          router.push(`/${params.storeId}/expenses`)
          toast.success(toastMessage);
        } catch (error) {
          toast.error('Somthing went wrong')
        }finally{
          setLoading(false)
        }
      }

      const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/expenses/${params.expenseId}`);
          router.refresh();
          router.push(`/${params.storeId}/expenses`);
          toast.success('Expense deleted.');
        } catch (error: any) {
          toast.error('Somthing went wrong');
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }

  return (
    <>
    <AlertModal
     isOpen={open}
     onClose={() => setOpen(false)}
     onConfirm={onDelete}
     loading={loading}
    />
    <div className='flex items-center justify-between '>
      <Heading
       title={title}
       description={description}/>
      {initialData && (
       <Button
       disabled={loading}
       variant='destructive'
       size='icon'
       onClick={() => setOpen(true)}
       >
      <Trash className='h-4 w-4'/>
       </Button>
      )}
    </div>
    <Separator/>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
    <div className="md:grid md:grid-cols-3 gap-8">
      <FormField
        control={form.control}
        name="item"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Item Name</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder="Headphones.." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
         <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input type='number' disabled={loading} placeholder="9.99" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
            />
    </div>
    <Button disabled={loading} className="ml-auto" type="submit">
            {action}
    </Button>
  </form>
    </Form>
    </>
  )
}

export default ExpenseForm