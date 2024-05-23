import React, { useEffect, useState } from "react";
import CompetenceApi from "@/services/Api/CompetenceApi"; // Import CompetenceApi
import UserApi from "@/services/Api/UserApi.js";

// import IntervenantApi from "@/services/Api/IntervenantApi"; // Import IntervenantApi
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
  intervenant_id: z.string().nonempty("Intervenant is required"),
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
});

const EditCompetence = ({ id, setOpen }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    setValue,
    formState: { errors },
  } = form;
  const [intervenants, setIntervenants] = useState([]);
  const { state } = useUserContext();

  useEffect(() => {
    const fetchIntervenants = async () => {
      try {
        const response = await UserApi.getInit();
        setIntervenants(response?.data?.intervenants);
      } catch (error) {
        console.error("Failed to fetch intervenants:", error);
      }
    };
    fetchIntervenants();
  }, []);

  useEffect(() => {
    const fetchCompetence = async () => {
      try {
        const response = await CompetenceApi.getCompetenceById(id);
        const competence = response?.data;
        if (competence) {
          Object.keys(competence).forEach((key) => {
            if (schema.shape[key]) {
              setValue(key, competence[key].toString());
            }
          });
        }
      } catch (error) {
        console.error("Error fetching competence:", error);
      }
    };
    fetchCompetence();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const editCompetenceLoading = toast.loading(
      "Updating competence in progress...",
    );
    try {
      const response = await CompetenceApi.updateCompetence(id, data);
      if (response.data && response?.status === 200) {
        toast.success("Competence updated successfully");
        setOpen(false); // Close the form after successful submission
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    }
    toast.dismiss(editCompetenceLoading);
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
          name='intervenant_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intervenant</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Name'
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
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder='Description'
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

export default EditCompetence;
