import React, { useEffect, useState } from "react";
import CertificationApi from "@/services/Api/CertificationApi.js";
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
  domaines_id: z.string().nonempty(),
  Intervenants_id: z.string().nonempty(),
  intiltule_certification: z.string().nonempty(),
  organisme_certification: z.string().nonempty(),
  type_certification: z.string().nonempty(),
});

const EditCertification = ({ id, setOpen }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    setValue,
    formState: { errors },
  } = form;
  const [domaines, setDomaines] = useState([]);
  const [intervenants, setIntervenants] = useState([]);
  const { state } = useUserContext();

  useEffect(() => {
    async function fetchData() {
      const response = await UserApi.getInit();
      setDomaines(response?.data?.domaines);
      setIntervenants(response?.data?.intervenants);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCertification() {
      try {
        const response = await CertificationApi.getCertificationById(id);
        const certification = response?.data;
        if (certification) {
          Object.keys(certification).forEach((key) => {
            if (schema.shape[key]) {
              setValue(key, certification[key].toString());
            }
          });
        }
      } catch (error) {
        console.error("Error fetching certification:", error);
      }
    }
    fetchCertification();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const editCertificationLoading = toast.loading(
      "Updating certification in progress...",
    );
    try {
      const response = await CertificationApi.updateCertification(id, data);
      if (response.data && response?.status === 200) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>
                The certification updated successfully
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
    toast.dismiss(editCertificationLoading);
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
          name='domaines_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domaine</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Domaine' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {domaines.map((domaine) => (
                      <SelectItem
                        key={domaine.id.toString()}
                        value={domaine.id.toString()}
                      >
                        {domaine.nom_domaine}
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
          name='Intervenants_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intervenant</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Intervenant' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {intervenants.map((intervenant) => (
                      <SelectItem
                        key={intervenant.id.toString()}
                        value={intervenant.id.toString()}
                      >
                        {intervenant.nom}
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
          name='intiltule_certification'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intitulé Certification</FormLabel>
              <FormControl>
                <Input
                  placeholder='Intitulé Certification'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='organisme_certification'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisme Certification</FormLabel>
              <FormControl>
                <Input
                  placeholder='Organisme Certification'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type_certification'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type Certification</FormLabel>
              <FormControl>
                <Input
                  placeholder='Type Certification'
                  {...field}
                />
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

export default EditCertification;
