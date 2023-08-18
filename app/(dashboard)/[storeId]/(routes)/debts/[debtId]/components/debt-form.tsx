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
import { Customer, Expense } from "@prisma/client"
import AlertModal from "@/components/modals/alert-modal"

const formSchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(8),
})
  
type DebtFormValue = z.infer<typeof formSchema>

interface DebtFormProps {
    initialData: Customer | null
  }

const DebtForm: React.FC<DebtFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? 'Edit Customer' : 'Create customer'
    const description = initialData ? 'Edit a customer' : 'Create a new customer'
    const toastMessage = initialData ? 'Customer updated.' : 'Customer created.'
    const action = initialData ? 'Save changes' : 'Create'
    
    const form = useForm<DebtFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
          name: '',
          phone: ''
        }
      })


    const onSubmit = async (data: DebtFormValue) => {
        try {
          setLoading(true)
          if(initialData){
    
            await axios.patch(`/api/${params.storeId}/debts/${params.debtId}`, data);
          }else{
            await axios.post(`/api/${params.storeId}/debts`, data);
          }
          router.refresh();
          router.push(`/${params.storeId}/debts`)
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
          await axios.delete(`/api/${params.storeId}/debts/${params.debtId}`);
          router.refresh();
          router.push(`/${params.storeId}/debts`);
          toast.success('Customer deleted.');
        } catch (error: any) {
          toast.error('Make sure to remove all debts to delete a customer');
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
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder="Abde" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
         <FormItem>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input disabled={loading} placeholder="+252000000000" {...field} />
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

export default DebtForm