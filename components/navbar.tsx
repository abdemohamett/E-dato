import React from 'react'
import MainNav from './main-nav'
import { redirect } from 'next/navigation';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prismadb from '@/lib/prismadb';
import StoreSwitcher from './store-switcher';
import { UserAvatar } from './ui/user-avatar';
import { ThemeToggle } from './theme-toggle';

const Navabar = async() => {
  const user = await getCurrentUser();
  const userId = user?.id

  if(!userId) {
    redirect('/auth')
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores}/>
        <MainNav className='mx-6'/>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle/>
          <UserAvatar user={user}/>
        </div>
      </div>
    </div>
  )
}

export default Navabar