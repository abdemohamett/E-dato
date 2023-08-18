import getCurrentUser from '@/app/actions/getCurrentUser'
import Navabar from '@/components/navbar'
import prismadb from '@/lib/prismadb'
import { ModalProvider } from '@/providers/modal-provider'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Create',
  description: 'Create store name to record expenses, debts and customers'
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const user = await getCurrentUser()
    const userId = user?.id
    
    if(!user){
        redirect('/auth')
    }

    const store = await prismadb.store.findFirst({
      where: {
        userId,
      }
    });
  
    if (store) {
      redirect(`/${store.id}`);
    };
  return (
  <main>
    <ModalProvider/>
    {children}
  </main>
  )
}
