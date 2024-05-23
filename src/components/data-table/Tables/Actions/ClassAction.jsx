import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Circle, MoreHorizontal} from "lucide-react";

import {useEffect, useState} from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.jsx";
import {toast} from "sonner";
import UserApi from "@/services/Api/UserApi.js";
import {Add} from "@/components/data-table/components/Add.jsx";
import {useUserContext} from "@/context/UserContext.jsx";

export const ClassAction = ({id , dateDebutReal , status}) => {

    const [open, setOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isBegin, setIsBegin] = useState(false);
    const {state} = useUserContext();
    const user = state?.user ;

    console.log('actions' ,state?.actions)

    useEffect(() => {
        const now = new Date();
        const beginDate = new Date(dateDebutReal);

        setIsBegin(now > beginDate);
    }, [dateDebutReal]);

    const handleValider = async ()=>
    {
      const response  = await UserApi.ValidateAction(id)
    }
    console.log(import.meta.env.VITE_BACKEND_ADMIN_ROLE_NAME === 'central')
    // console.log(!user?.role_name === import.meta.env.VITE_BACKEND_ADMIN_ROLE_NAME)

    if(user?.role_name === 'intervenant')
    {
        return <></>
    }
    return (
       <>
           {!(user?.role_name === import.meta.env.VITE_BACKEND_ADMIN_ROLE_NAME) ? <>
               <AlertDialog open={isDelete}>


                   <AlertDialogTrigger asChild >
                       <Button variant={''} onClick={()=>setIsDelete(true)}> Anuuler</Button>
                   </AlertDialogTrigger>

               </AlertDialog>
               <DropdownMenuSeparator/>



               {open && <Add actionName={'Edit'} name={'intervenant'} setOpen={setOpen} open={open} addAction={(setOpen)=><EditIntervenant id={id} setOpen={setOpen} />}/>}

               <AlertDialog open={isDelete}>
                   {!isBegin ?
                       <AlertDialogContent>
                           <AlertDialogHeader>
                               <AlertDialogTitle>
                                   Are you absolutely sure to anuller
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
                                       This will permanently delete this action you cant back{' '}
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
                                           const response = await UserApi.DeleteAction(id)
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
                                           toast.success('action not deleted', {
                                               description: `action was not deleted try again after a while`,
                                               icon: <Circle/>,
                                           })
                                       }
                                   }}
                               >
                                   Anuller
                               </AlertDialogAction>
                           </AlertDialogFooter>
                       </AlertDialogContent> :  <AlertDialogContent>
                           <AlertDialogHeader>
                               <AlertDialogTitle>
                                   you cants anuuler because action start
                                   <span className={'font-bold'}>
                      {' '}
                                       {/*{firstname} {lastname}*/}
                    </span>{' '}
                                   ?
                               </AlertDialogTitle>
                               <AlertDialogDescription>
                    <span className={'text-lg text-red-600 text-lg font-mono'}>
                      {' '}
                        you cants anuuler because action start x
                    </span>
                                   <span className={'text-red-600 text-lg font-mono'}>
                      {' '}
                                       when action start you cant anuuler it and thank you for your understanding{' '}
                    </span>
                               </AlertDialogDescription>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                               <AlertDialogCancel onClick={()=>setIsDelete(false)}>Done</AlertDialogCancel>

                           </AlertDialogFooter>
                       </AlertDialogContent>}
               </AlertDialog>
           </>:
            <Button  size={'sm'} className={'w-20'} onClick={handleValider}> {status ? 'valider' : 'devalider'}</Button>
           }
       </>
    )
}
