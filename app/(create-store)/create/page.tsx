'use client'

import { useStoreModal } from "@/hooks/use-store-modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SetupPage = () => {
  const router = useRouter()
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)
  
  useEffect(() => {
    if(!isOpen){
      onOpen()
    }
  }, [isOpen, onOpen])

  // const { data: session, status } = useSession()

  // if (status === "unauthenticated") {
  //   return router.push('/auth')
  // }
  return null
}

export default SetupPage;