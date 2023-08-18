import type { Metadata } from 'next'
import getCurrentUser from '../actions/getCurrentUser'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edato | Auth',
//   description: 'Edato is data collect software for small and medium  Businesses .',
}

export default async function AuhtLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if(user){
      redirect('/create')
  }
  return (
  <main>
    {children}
  </main>
  )
}
