'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger 
 } from "@/components/ui/dropdown-menu"
import { LogOut, Settings } from "lucide-react";
import { Button } from "./button";
import { Separator } from "./separator";
import Link from "next/link";
import { useParams } from "next/navigation";

interface UserProps{
    user: User
}

export const UserAvatar: React.FC<UserProps> = ({
    user
}) => {

  const params = useParams()

  return (
    <DropdownMenu>
     <DropdownMenuTrigger asChild>
    <Avatar className="h-8 w-8">
      <AvatarImage src={user.image!} />
      <AvatarFallback className='uppercase text-xl'>
        {user.name?.charAt(0)}
        {/* {user?.name?.charAt(1)} */}
      </AvatarFallback>
    </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="flex flex-col items-center" align="end">
      <Link href={`/${params.storeId}/settings`}>
      <Button size='sm' variant='ghost'>
      <Settings className="mr-2 h-4 w-4"/>
       <p>Settings</p>
      </Button>
      </Link>
      <Separator/>
      <Button onClick={() => signOut()} size='sm' variant='ghost'>
      <LogOut color="red" className="mr-2 h-4 w-4"/>
      <p>Logout</p>
      </Button>
    </DropdownMenuContent>
    </DropdownMenu>
  );
};