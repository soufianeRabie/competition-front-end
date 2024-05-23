import React, { useEffect, useState } from "react";
import IntervenantApi from "@/services/Api/IntervenantApi.js";
import UserApi from "@/services/Api/UserApi.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/custom/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useUserContext } from "@/context/UserContext.jsx";

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
});

const EditIntervenant = ({ id, setOpen }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    setValue,
    formState: { errors },
  } = form;
  const [etablissements, setEtablissements] = useState([]);
  const [users, setUsers] = useState([]);
  const { state } = useUserContext();

    useEffect(() => {
        setEtablissements(state?.etablissements)
        setUsers(state?.users)
    }, []);

  useEffect(() => {
    async function fetchIntervenant() {
      try {
        const response = await IntervenantApi.getIntervenantById(id);
        const intervenant = response?.data;
        if (intervenant) {
          Object.keys(intervenant).forEach((key) => {
            if (schema.shape[key]) {
              setValue(key, intervenant[key].toString());
            }
          });
        }
      } catch (error) {
        console.error("Error fetching intervenant:", error);
      }
    }
    fetchIntervenant();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const editIntervenantLoading = toast.loading(
      "Updating intervenant in progress...",
    );
    try {
      const response = await IntervenantApi.updateIntervenant(id, data);
      if (response.data && response?.status === 200) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>
                The intervenant updated successfully
              </code>
            </pre>
          ),
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    }
    toast.dismiss(editIntervenantLoading);
  };
  return (
    <Form {...form}>
      {JSON.stringify(errors)}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"h-96 overflow-auto"}
      >
        <FormField
          control={form.control}
          name='etablissements_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Etablissement</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Etablissement' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {etablissements.map((etablissement) => (
                      <SelectItem
                        key={etablissement.id.toString()}
                        value={etablissement.id.toString()}
                      >
                        {etablissement.nom_efp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
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
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select User' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem
                        key={user.id.toString()}
                        value={user.id.toString()}
                      >
                        {user.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='matricule'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matricule</FormLabel>
              <FormControl>
                <Input
                  placeholder='Matricule'
                  {...field}
                />
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
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input
                  placeholder='Nom'
                  {...field}
                />
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
              <FormLabel>Date de Naissance</FormLabel>
              <FormControl>
                <Input
                  type='date'
                  {...field}
                />
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
              <FormLabel>Intitulé Diplôme</FormLabel>
              <FormControl>
                <Input
                  placeholder='Intitulé Diplôme'
                  {...field}
                />
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
              <FormLabel>Type Diplôme</FormLabel>
              <FormControl>
                <Input
                  placeholder='Type Diplôme'
                  {...field}
                />
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
              <FormLabel>Spécialité Diplôme</FormLabel>
              <FormControl>
                <Input
                  placeholder='Spécialité Diplôme'
                  {...field}
                />
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
              <FormLabel>Type Intervenant</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='0'>Externe</SelectItem>
                    <SelectItem value='1'>Interne</SelectItem>
                  </SelectContent>
                </Select>
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='1'>True</SelectItem>
                    <SelectItem value='0'>False</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default EditIntervenant;
