import getCurrentUser from "@/app/actions/getCurrentUser";
import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { ModalProvider } from "@/providers/modal-provider";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard that allows you to manage your data and record all the new data for your business.'
  }

export default async function DashboardLayout({
    children,
    params
}: {
   children: React.ReactNode,
   params: {storeId: string}
}){

    const user = await getCurrentUser();
    const userId = user?.id

    if(!userId){
        redirect('/auth')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if(!store){
        redirect('/create')
    }

    return(
      <>
       <Navbar/>
       <ModalProvider/>
       {children}
      </>
    )
}