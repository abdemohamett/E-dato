'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Store } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Separator } from "@/components/ui/separator"
import AlertModal from "@/components/modals/alert-modal"


interface SettingsFormProps {
    initialData: Store
  }

  const formSchema = z.object({
    name: z.string().min(1)
})
  
type SettingsFormValue = z.infer<typeof formSchema>

const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();
    // const origin = useOrigin()
  
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<SettingsFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
      })

      const onSubmit = async (data: SettingsFormValue) => {
        try {
          setLoading(true)
          await axios.patch(`/api/stores/${params.storeId}`, data);
          router.refresh();
          toast.success('Business name updated.');
        } catch (error) {
          toast.error('Somthing went wrong')
        }finally{
          setLoading(false)
        }
      }

      const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/stores/${params.storeId}`);
          router.refresh();
          router.push('/create');
          toast.success('Business deleted.');
        } catch (error: any) {
          toast.error('Make sure you remove it the right way..');
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
     title="Settings"
     description="Manage store preferences"/>

    <Button
       disabled={loading}
       variant='destructive'
       size='icon'
       onClick={() => setOpen(true)}
       >
      <Trash className='h-4 w-4'/>
    </Button>
</div>
<Separator/>
<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
  <div className="grid md:grid-cols-3 gap-8">
    <FormField 
    control={form.control}
    name="name"
    render={({ field }) => (
     <FormItem>
       <FormLabel>Name</FormLabel>
       <FormControl>
        <Input disabled={loading} placeholder='Business Name' {...field} />
       </FormControl>
       <FormMessage/>
     </FormItem>
    )}
    />
  </div>
  <Button disabled={loading} className='ml-auto' type='submit'>
    Save Changes
  </Button>
</form>
</Form>
</>
  )
}

export default SettingsForm