import React, { useEffect, useState } from 'react';
import UserApi from "@/services/Api/UserApi.js";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/custom/button';
import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Textarea} from "@/components/ui/textarea.jsx";
import {toast} from "sonner";
import {useUserContext} from "@/context/UserContext.jsx";

const schema = z.object({
    etablissements_id: z.string().nonempty(),
    users_id: z.string().nonempty(),
    matricule: z.string().nonempty(),
    nom: z.string().nonempty(),
    datenaissance: z.string().nonempty(),
    intitule_diplome: z.string().nonempty(),
    type_diplome: z.string().nonempty(),
    specialite_diplome: z.string().nonempty(),
    type_intervenant: z.string().nonempty(),
    status: z.string().nonempty(),
    adresse: z.string().nonempty(),
    tel: z.string().nonempty(),
    ville: z.string().nonempty(),
});

const AddIntervenant = ({setOpen}) => {
    const form = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
    })
    const {register , formState : {errors}} = form


    const [etablissements, setEtablissements] = useState([]);
    const [users, setUsers] = useState([]);
    const {state} = useUserContext()

    useEffect(() => {
        async function fetchData() {
            const response = await UserApi.getInit();
            setEtablissements(response?.data?.etablisments);
            setUsers(response?.data.Users);
        }
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        const AddIntervenatLoading = toast.loading('updating profile in progress...')
        try {
            const response = await UserApi.addInv(data ) ;
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

        toast.dismiss(AddIntervenatLoading)
    };

    return (
        <Form {...form}>
            {JSON.stringify(errors)}
            <form  onSubmit={form.handleSubmit(onSubmit)} className={'h-96  overflow-auto'}>
                <FormField
                    control={form.control}
                    name='etablissements_id'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Etablisment</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select Etablisment' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {etablissements.map((etablisment) => (
                                        <SelectItem key={etablisment.id.toString()} value={etablisment.id.toString()}>
                                            {etablisment.nom_efp}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='users_id'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select user' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem key={user.id.toString()} value={user.id.toString()}>
                                            {user.email}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='matricule'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>matricule</FormLabel>
                            <FormControl>
                                <Input placeholder='matricule' className='resize-none' {...field} />
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
                            <FormLabel>nom</FormLabel>
                            <FormControl>
                                <Input placeholder='nom' className='resize-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='datenaissance'
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
                    name='intitule_diplome'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder='intitule diplome' className='resize-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='type_diplome'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder='type diplome' className='resize-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='specialite_diplome'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>specialite diplome</FormLabel>
                            <FormControl>
                                <Input placeholder='specialite diplome' className='resize-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='type_intervenant'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>type intervenant</FormLabel>
                            <FormControl>
                                <Input placeholder='type intervenant' className='resize-none' {...field} />
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
                            <FormLabel>status</FormLabel>
                            <FormControl>
                                <Input placeholder='status' className='resize-none' {...field} />
                            </FormControl>
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
                                <Input placeholder='adress' className='resize-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='tel'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>telephone</FormLabel>
                            <FormControl>
                                <Input placeholder='telephone' className='resize-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='ville'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ville</FormLabel>
                            <FormControl>
                                <Input placeholder='ville' className='resize-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button></form>
        </Form>
    );
}

export default AddIntervenant;
