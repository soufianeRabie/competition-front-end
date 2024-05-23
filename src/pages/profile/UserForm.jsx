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



export default function UserForm() {
    const {state} = useUserContext()
    const user = state?.user ;
    const userProfile = user?.profile

    console.log('user' , user)
    const defaultValues = {
        prenom: userProfile?.prenom,
        nom: userProfile?.nom,
        date_de_naissance: userProfile?.date_de_naissance,
        genre: userProfile?.genre,
        adresse: userProfile?.adresse,
        telephone: userProfile?.telephone,
    }
    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: 'onChange',
    })


    const isAlreadyHaveAnProfile  = user?.profile?.id
    const handleProfile = async (data )=>
    {
        if(isAlreadyHaveAnProfile)
        {
            return await UserApi.updateUserProfile(data , user?.profile.id )
        }
        return await UserApi.CreateProfile(data);
    }
    const  onSubmit= async (data ) =>{

        const editUserProfileLoading = toast.loading('updating profile in progress...')
        try {
            const response = await handleProfile(data)
            toast.dismiss(editUserProfileLoading)

            if(response.data && response?.status === 200)
            {
                toast({

                    title: 'updated successfully',
                        description:  'the profile was updated successfully'
                })
            }else
            {
                throw  new Error('something went wrong')
            }
        }catch (e)
        {
            toast.dismiss(editUserProfileLoading);
            toast.error(e?.message || 'something went wrong');
        }

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
                <Button type='submit'>{isAlreadyHaveAnProfile ?'Update' : 'add'} Profile</Button>
            </form>
        </Form>
    )
}
