import { db } from '@/lib/db'
import React from 'react'
import DataTable from './data-table'
import { Plus } from 'lucide-react'
import { currentUser } from '@clerk/nextjs'
import { columns } from './columns'
import SendInvitation from '@/components/forms/send-invitation'

type Props = {
  params: { agencyId: string }
}

const TeamPage = async ({ params }: Props) => {
  const authUser = await currentUser()
  if (!authUser) return null

  const teamMembers = await db.user.findMany({
    where: {
      agencyId: params.agencyId,
    },
    include: {
      Agency: true,
      Permissions: true,
    },
  })

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
  })

  if (!agencyDetails) return null

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
      filterValue="name"
      columns={columns}
      data={teamMembers}
    />
  )
}

export default TeamPage
