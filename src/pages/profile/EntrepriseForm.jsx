import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/custom/button'
import { z } from 'zod'
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
import UserApi from "@/services/Api/UserApi.js";
import {toast} from "sonner";
import {useUserContext} from "@/context/UserContext.jsx";


// Define your schema
const schema = z.object({
    raison: z.string().nullable(),
    email: z.string().nullable(),
    site: z.string().nullable(),
    logo: z.string().nullable(),
    status: z.string().nullable(),
    representant: z.string().nullable(),
    telephone1: z.string().nullable(),
    telephone2: z.string().nullable(),
    telephone3: z.string().nullable(),
});

export const EntrepriseForm = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {}, // Provide default values if needed
    });

    const {state} = useUserContext()
    const user = state?.user ;

    const onSubmit = async (data) => {
        const editUserProfileLoading = toast.loading('updating profile in progress...')
        try {
            const response = await UserApi.updateEntrepriseProfile(data , user?.id) ;
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
    };

    return (
        <Form {...form} className=''>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='raison'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Raison</FormLabel>
                            <FormControl>
                                <Input placeholder='Raison' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Email' type='email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='site'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Site</FormLabel>
                            <FormControl>
                                <Input placeholder='Email' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='logo'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logo</FormLabel>
                            <FormControl>
                                <Input placeholder='Logo' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Input placeholder='Status' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='representant'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Representant</FormLabel>
                            <FormControl>
                                <Input placeholder='Representant' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='telephone1'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telephone 1</FormLabel>
                            <FormControl>
                                <Input placeholder='Telephone 1' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='telephone2'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telephone 2</FormLabel>
                            <FormControl>
                                <Input placeholder='Telephone 2' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='telephone3'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telephone 3</FormLabel>
                            <FormControl>
                                <Input placeholder='Telephone 3' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Update Profile</Button>
            </form>
        </Form>
    );
};
