import { DataTable } from '../DataTable.jsx'
import { useEffect, useState } from 'react'
import { DataTableColumnHeader } from '../DataTableColumnHeader.jsx'
import {useUserContext} from "@/context/UserContext.jsx";
import {DialogContent, Dialog, DialogDescription,DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {UpdateUserRole} from "@/components/data-table/components/UpdateUserRole.jsx";


export default function UsersList() {
    const [data, setData] = useState([])

    const {state} = useUserContext();
    const AdminListColumns = [
        {
            accessorKey: 'email',
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="email" />
            },
        },
        {
            accessorKey: 'role_name',
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="role" />
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="created at " />
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const role_name = (row.original.role_name)
              return (
                  <Dialog>
                      <DialogTrigger>
                          <Button size={'sm'} variant={''}>
                              update role
                          </Button>
                      </DialogTrigger>
                      <DialogContent className={'w-full mx-auto'}>
                          <DialogHeader>
                              <DialogTitle>Are you absolutely sure?</DialogTitle>
                              <DialogDescription>
                    <span className={'text-lg text-red-600'}>
                      {' '}
                        this action will update the role of the user
                    </span>
                              </DialogDescription>
                          </DialogHeader>
                          <UpdateUserRole
                            currentRole={role_name}
                          />
                      </DialogContent>
                  </Dialog>
              )
            }
            }
    ]

    useEffect(() => {
      setData(state?.users)
    }, [state])


    return (
        <>
            {data?.length > 0 ? (
                <DataTable
                    columns={AdminListColumns}
                    data={data}
                    name={'user'}
                    filterBy={'email'}
                    messageFilter={'Filtrer par email'}
                />
            ) : (
                <div className={'w-full'}>
                    <h1 className={"text-3xl w-3/4 text-center mx-auto text-blue-500"}>Aucun users pour le moment</h1>
                </div>
            )}
        </>
    )
}
