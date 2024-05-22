import React from 'react'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/custom/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/components/lib/utils.js'
import { toast } from 'sonner'
import UserApi from "@/services/Api/UserApi.js";
import {useUserContext} from "@/context/UserContext.jsx";

const profileFormSchema = z.object({
    prenom: z.string().nullable(),
    nom: z.string().nullable(),
    date_de_naissance: z.string().nullable(),
    genre: z.enum(['male', 'female']).nullable(),
    adresse: z.string().nullable(),
    telephone: z.string().nullable(),
})

const defaultValues = {
    prenom: '',
    nom: '',
    date_de_naissance: '',
    genre: '',
    adresse: '',
    telephone: '',
}

export default function UserForm() {
    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    const {state} = useUserContext()
    const user = state?.user ;
    const  onSubmit= async (data ) =>{

        const editUserProfileLoading = toast.loading('updating profile in progress...')
        try {
            const response = await UserApi.updateUserProfile(data , user?.id) ;
            if(response.data && response?.status === 200)
            {
                toast({

                    title: 'You submitted the following values:',
                        description: (
                    <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                  <code className='text-white'>{'the profile updated successfully'}</code>
               </pre>
                ),
                })
            }else
            {
                throw  new Error('something went wrong')
            }
        }catch (e)
        {
            toast.error(e?.message || 'something went wrong');
        }

        toast.dismiss(editUserProfileLoading)
    }

    return (
        <Form {...form} className=''>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='prenom'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder='First Name' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='nom'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Last Name' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='date_de_naissance'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input type='date' placeholder='Date of Birth' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='genre'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select Gender' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='male'>Male</SelectItem>
                                    <SelectItem value='female'>Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='adresse'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Address' className='resize-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='telephone'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder='Phone' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name='email'*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Email</FormLabel>*/}
                {/*            <FormControl>*/}
                {/*                <Input placeholder='Email' type='email' {...field} />*/}
                {/*            </FormControl>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name='poste'*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Position</FormLabel>*/}
                {/*            <FormControl>*/}
                {/*                <Input placeholder='Position' {...field} />*/}
                {/*            </FormControl>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name='nom_organisation'*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Organization Name</FormLabel>*/}
                {/*            <FormControl>*/}
                {/*                <Input placeholder='Organization Name' {...field} />*/}
                {/*            </FormControl>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name='adresse_organisation'*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Organization Address</FormLabel>*/}
                {/*            <FormControl>*/}
                {/*                <Textarea placeholder='Organization Address' className='resize-none' {...field} />*/}
                {/*            </FormControl>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                <Button type='submit'>Update Profile</Button>
            </form>
        </Form>
    )
}
