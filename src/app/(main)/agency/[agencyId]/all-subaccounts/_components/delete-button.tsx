'use client'
import {
  deleteAccount,
  getAccountDetails,
  saveActivityLogsNotification,
} from '@/lib/queries'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  accountId: string
}

const DeleteButton = ({ accountId }: Props) => {
  const router = useRouter()

  return (
    <div
      className="text-white"
      onClick={async () => {
        const response = await getAccountDetails(accountId)
        await saveActivityLogsNotification({
          agencyId: response.agencyId,  // Ensure the correct agencyId is passed
          description: `Deleted an account | ${response?.name}`,
          accountId,
        })
        await deleteAccount(accountId)
        router.refresh()
      }}
    >
      Delete Account
    </div>
  )
}

export default DeleteButton
