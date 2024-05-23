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

const AddCompetence = ({ setOpen }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    formState: { errors },
  } = form;

  const [intervenants, setIntervenants] = useState([]);
  const { state } = useUserContext();

  useEffect(() => {
    const fetchIntervenants = async () => {
      try {
        const response = await UserApi.getInit();
        setIntervenants(response?.data?.intervenants);
        console.log("ddd", response?.data?.intervenants);
      } catch (error) {
        console.error("Failed to fetch intervenants:", error);
      }
    };
    fetchIntervenants();
  }, []);

  const onSubmit = async (data) => {
    const addCompetenceLoading = toast.loading(
      "Adding competence in progress...",
    );
    try {
      const response = await CompetenceApi.addCompetence(data);
      if (response.data && response?.status === 201) {
        toast.success("Competence added successfully");
        setOpen(false); // Close the form after successful submission
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    }

    toast.dismiss(addCompetenceLoading);
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='name'
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

export default AddCompetence;
