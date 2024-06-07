'use client'

import clsx from 'clsx'
import { ColumnDef } from '@tanstack/react-table'
import {
  Agency,
  AgencySidebarOption,
  Permissions,
  Prisma,
  Role,
  User,
} from '@prisma/client'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useModal } from '@/providers/modal-provider'
import UserDetails from '@/components/forms/user-details'

import { deleteUser, getUser } from '@/lib/queries'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UsersWithAgencyPermissionsSidebarOptions } from '@/lib/types'
import CustomModal from '@/components/global/custom-modal'

export const columns: ColumnDef<UsersWithAgencyPermissionsSidebarOptions>[] = [
  {
    accessorKey: 'id',
    header: '',
    cell: () => {
      return null
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const avatarUrl = row.getValue('avatarUrl') as string
      return (
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 relative flex-none">
            <Image
              src={avatarUrl}
              fill
              className="rounded-full object-cover"
              alt="avatar image"
            />
          </div>
          <span>{row.getValue('name')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'avatarUrl',
    header: '',
    cell: () => {
      return null
    },
  },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role: Role = row.getValue('role')
      return (
        <Badge
          className={clsx({
            'bg-emerald-500': role === 'AGENCY_OWNER',
            'bg-orange-400': role === 'AGENCY_ADMIN',
            'bg-primary': role === 'USER',
            'bg-muted': role === 'GUEST',
          })}
        >
          {role}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const rowData = row.original

      return <CellActions rowData={rowData} />
    },
  },
]

interface CellActionsProps {
  rowData: UsersWithAgencyPermissionsSidebarOptions
}

const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {
  const { setOpen } = useModal()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  if (!rowData) return null
  if (!rowData.Agency) return null

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => navigator.clipboard.writeText(rowData?.email)}
          >
            <Copy size={15} /> Copy Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => {
              setOpen(
                <CustomModal
                  subheading="Edit user details"
                  title="Edit User Details"
                >
                  <UserDetails
                    type="agency"
                    id={rowData?.Agency?.id || null}
                    userData={rowData}
                  />
                </CustomModal>,
                async () => {
                  return { user: await getUser(rowData?.id) }
                }
              )
            }}
          >
            <Edit size={15} />
            Edit Details
          </DropdownMenuItem>
          {rowData.role !== 'AGENCY_OWNER' && (
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="flex gap-2"
                onClick={() => {}}
              >
                <Trash size={15} /> Remove User
              </DropdownMenuItem>
            </AlertDialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the user
            and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-destructive hover:bg-destructive"
            onClick={async () => {
              setLoading(true)
              await deleteUser(rowData.id)
              toast({
                title: 'Deleted User',
                description:
                  'The user has been deleted from this agency they no longer have access to the agency',
              })
              setLoading(false)
              router.refresh()
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
