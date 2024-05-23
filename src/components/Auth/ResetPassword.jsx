import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.jsx";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.jsx";
import UserApi from "@/services/Api/UserApi.js";

const formSchema = z.object({
    email: z.string().min(5, {
        message: "Username must be at least 2 characters.",
    }),
})
export const ResetPassword = ({isOpen , setIsOpen} ) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    })

    const onSubmit = async (value) => {
       const response = await UserApi.ResetPassword(value.email);

        console.log(response)
    }

    return (
        <>
            <AlertDialog open={isOpen} >
                <AlertDialogContent >
                    <AlertDialogHeader>
                        <AlertDialogTitle>reset password</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="shadcn" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                  tap your email here
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className={'w-full justify-center items-center flex flex-col'}>Submit</Button>
                                </form>
                            </Form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel  className={'w-full'} onClick={() => setIsOpen(false)}>close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

