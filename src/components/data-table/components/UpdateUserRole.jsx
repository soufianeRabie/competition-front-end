'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {  useState } from 'react'
import { toast } from 'sonner'
import {  Loader } from 'lucide-react'
import {useUserContext} from "@/context/UserContext.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import UserApi from "@/services/Api/UserApi.js";

const FormSchema = z.object({
    role: z.string({
        required_error: 'Please select an role to display.',
    }),
})

export function UpdateUserRole({ currentRole }) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
    })

    const allRoles = ['intervenant', 'entreprise', 'central', 'regional' , 'local']
    const [roles, setRoles] = useState(
        allRoles.filter((st) => st !== currentRole),
    )
    const [isLoading, setIsLoading] = useState();
    const [success, setSuccess] = useState();
    const {state:{user}} = useUserContext();

    const onSubmit = async (data) => {
        // console.log(data)
        const updateRoleToast = toast.loading('updating role in progress...')
       try {
            await UserApi.UpdateUserRole(data.role , user?.id)
           toast.dismiss(updateRoleToast)
       }catch (e)
       {
           toast.dismiss(updateRoleToast)
           console.log(e)
       }

    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-4/5 mx-auto space-y-6"
            >
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {roles.map((role, key) => (
                                        <SelectItem key={role} value={role}>
                                            {role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>choice an role </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className={'w-full mx-auto'}>
                    {!success ? (
                        <Button className={'w-full'} disabled={isLoading} type="submit">
                            {' '}
                            {isLoading && (
                                <span className={'animate-spin'}>
                  <Loader />
                </span>
                            )}
                            {!isLoading ? 'update' : 'updating...'}
                        </Button>
                    ) : (
                        <DialogClose className={'w-full'}>
                            <Button type={'reset'} className={'w-full'}>
                                close
                            </Button>
                        </DialogClose>
                    )}
                </div>
            </form>
        </Form>
    )
}
