'use cleint'

import { 
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"


import { DebtColumn } from "./columns"

import { CircleDollarSign, Edit, MoreHorizontal, Trash } from "lucide-react"
import { Copy } from "lucide-react"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import AlertModal from "@/components/modals/alert-modal"

interface CellActionProps{
 data: DebtColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/debts/${data.id}`);
          router.refresh();
          toast.success('Customer deleted.');
        } catch (error: any) {
          toast.error('Make sure to remove all debts to delete a customer.');
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className="h-8 w-8 p-0">
         <span className="sr-only">Open Menu</span>
         <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
         <DropdownMenuLabel>
            Actions
         </DropdownMenuLabel>
         <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/debts/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4"/>
            Update
         </DropdownMenuItem>
         <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/debts/${data.id}/debt`)}>
            <CircleDollarSign className="mr-2 h-4 w-4"/>
            Debts
         </DropdownMenuItem>
         <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4"/>
            Delete
         </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
 </>
  )
}
