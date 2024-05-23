import React, { useEffect, useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import { useUserContext } from "@/context/UserContext.jsx";
import UserApi from "@/services/Api/UserApi.js";

const schema = z.object({
    themes_id: z.string().nonempty(),
    intervenants_id: z.string().nonempty(),
    etablissements_id: z.string().nonempty(),
    date_debut_prev: z.string().nonempty(),
    date_fin_prev: z.string().nonempty(),
    prix_reel: z.string().nullable(),
    date_fin_real: z.string().nullable(),
    date_debut_real: z.string().nullable(),
    nbparticipants: z.string().nullable(),
    status: z.string().nullable(),
});

const AddExercice = ({ setOpen }) => {
    const form = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });
    const { register, formState: { errors } } = form;

    const [entreprises, setEntreprises] = useState([]);
    const [themes, setThemes] = useState([]);
    const [intervenants, setIntervenants] = useState([]);
    const [etablissements, setEtablissements] = useState([]);
    const { state } = useUserContext();

    useEffect(() => {
        async function fetchData() {
            const response = await UserApi.getInit();
            setEntreprises(response?.data?.entreprises);
            setThemes(response?.data?.themes);
            setIntervenants(response?.data?.intervenants);
            setEtablissements(response?.data?.etablissements);
        }
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        const addExerciceLoading = toast.loading('Adding exercice in progress...');
        try {
            const response = await UserApi.addExercice(data);
            if (response.data && response?.status === 200) {
                toast({
                    title: 'Success',
                    description: (
                        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                            <code className='text-white'>Exercice added successfully</code>
                        </pre>
                    ),
                });
            } else {
                throw new Error('Something went wrong');
            }
        } catch (e) {
            toast.error(e?.message || 'Something went wrong');
        }
        toast.dismiss(addExerciceLoading);
    };

    return (
        <Form {...form}>
            {JSON.stringify(errors)}
            <form onSubmit={form.handleSubmit(onSubmit)} className={'h-96 overflow-auto'}>
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name='entreprises_id'*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Entreprise</FormLabel>*/}
                {/*            <Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                {/*                <FormControl>*/}
                {/*                    <SelectTrigger>*/}
                {/*                        <SelectValue placeholder='Select entreprise' />*/}
                {/*                    </SelectTrigger>*/}
                {/*                </FormControl>*/}
                {/*                <SelectContent>*/}
                {/*                    {entreprises.map((entreprise) => (*/}
                {/*                        <SelectItem key={entreprise.id.toString()} value={entreprise.id.toString()}>*/}
                {/*                            {entreprise.nom}*/}
                {/*                        </SelectItem>*/}
                {/*                    ))}*/}
                {/*                </SelectContent>*/}
                {/*            </Select>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                <FormField
                    control={form.control}
                    name='themes_id'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thème</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select thème' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {themes.map((theme) => (
                                        <SelectItem key={theme.id.toString()} value={theme.id.toString()}>
                                            {theme.intitule_theme}
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
                    name='intervenants_id'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Intervenant</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select intervenant' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {intervenants.map((intervenant) => (
                                        <SelectItem key={intervenant.id.toString()} value={intervenant.id.toString()}>
                                            {intervenant.nom}
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
                    name='etablissements_id'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Établissement</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select établissement' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {etablissements.map((etablissement) => (
                                        <SelectItem key={etablissement.id.toString()} value={etablissement.id.toString()}>
                                            {etablissement.nom_efp}
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
                    name='date_debut_prev'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date de début prévue</FormLabel>
                            <FormControl>
                                <Input type='datetime-local' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='date_fin_prev'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date de fin prévue</FormLabel>
                            <FormControl>
                                <Input type='datetime-local' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='prix_reel'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prix réel</FormLabel>
                            <FormControl>
                                <Input type='number' step='0.01' placeholder='Prix réel' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='date_fin_real'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date de fin réelle</FormLabel>
                            <FormControl>
                                <Input type='datetime-local' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='date_debut_real'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date de début réelle</FormLabel>
                            <FormControl>
                                <Input type='datetime-local' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='nbparticipants'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de participants</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder='Nombre de participants' {...field} />
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
                                <Input type='number' placeholder='Status' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default AddExercice;
