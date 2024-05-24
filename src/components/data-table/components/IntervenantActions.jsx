import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import { MoreHorizontal} from "lucide-react";
import {useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.jsx";
import {toast} from "sonner";
import UserApi from "@/services/Api/UserApi.js";

export const TrainerActions = ({intId}) => {

    const [open, setOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <AlertDialog open={isDelete}>
                        <DropdownMenuItem
                            // onClick={() => navigator.clipboard.writeText(payment.id)}
                        >

                            <AlertDialogTrigger asChild >
                                <span onClick={()=>setIsDelete(true)}> Delete</span>
                            </AlertDialogTrigger>
                        </DropdownMenuItem>

                    </AlertDialog>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>setOpen(true)} >
                        Edit Trainer
                    </DropdownMenuItem>
                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {open && <Add actionName={'Edit'} name={'Trainer'} setOpen={setOpen} open={open} addAction={(setOpen)=><EditTrainer setOpen={setOpen} TrainerId={TrainerId}/>}/>}

            <AlertDialog open={isDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure to delete
                            <span className={'font-bold'}>
                      {' '}
                                {/*{firstname} {lastname}*/}
                    </span>{' '}
                            ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                    <span className={'text-lg'}>
                      {' '}
                        This action cannot be undone.
                    </span>
                            <span className={'text-red-600 text-lg font-mono'}>
                      {' '}
                                This will permanently delete All seances and  of this trainer{' '}
                    </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={()=>setIsDelete(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                const deletingLoader = toast.loading(
                                    'Deleting in progress.',
                                )

                                try {
                                    const response = await UserApi.DeleteInv(intId)
                                    toast.dismiss(deletingLoader)
                                    // if (response?.status === 200) {
                                    //     dispatch({
                                    //         type: 'DELETE_DELIVERY',
                                    //         payload: {
                                    //             id: id,
                                    //         },
                                    //     })
                                    //     setData(data.filter((delivery) => delivery.id !== id))
                                    //     toast.success('delivery deleted', {
                                    //         description: `delivery deleted successfully`,
                                    //         icon: <Trash2Icon />,
                                    //     })
                                    // }
                                } catch (err) {
                                    toast.dismiss(deletingLoader)
                                    toast.success('intervenant not deleted', {
                                        description: `intervenant was not deleted try again after a while`,
                                        icon: <CircleX/>,
                                    })
                                }
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
