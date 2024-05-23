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
import IntervenantApi from "../../../../services/Api/IntervenantApi";

const schema = z.object({
  domaines_id: z.string().nonempty(),
  Intervenants_id: z.string().nonempty(),
  intiltule_certification: z.string().nonempty(),
  organisme_certification: z.string().nonempty(),
  type_certification: z.string().nonempty(),
});

const AddCertification = ({ setOpen }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    formState: { errors },
  } = form;

  const [domaines, setDomaines] = useState([]);
  const [intervenants, setIntervenants] = useState([]);
  const { state } = useUserContext();

  useEffect(() => {
    const fetchData=async()=> {
      const response = await UserApi.getInit();
      setDomaines(response?.data?.domaines);
      setIntervenants(response?.data?.intervenants);

    }
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    console.log(data)
    const addCertificationLoading = toast.loading(
      "Adding certification in progress...",
    );
    try {
      const response = await CertificationApi.addCertification(data);
      if (response.data && response?.status === 201) {
    console.log(data);

        toast({
          title: "You submitted the following values:",
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>
                Certification added successfully
              </code>
            </pre>
          ),
        });
      } else {
        throw new Error("something went wrong");
      }
    } catch (e) {
    console.log(data);

      toast.error(e?.message || "something went wrong");
    }

    toast.dismiss(addCertificationLoading);
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
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
                  className='resize-none'
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
                  className='resize-none'
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
                  className='resize-none'
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

export default AddCertification;
