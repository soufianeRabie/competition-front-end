import React, { useEffect, useState } from "react";
import ThemeApi from "@/services/Api/ThemeApi.js"; // Import ThemeApi instead of CertificationApi
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
  intitule_theme: z.string().nonempty(), // Adjusted schema to match theme data structure
  duree_formation: z.string().nonempty(), // Added duree_formation to schema
  status: z.string().nonempty(), // Added status to schema
});

const EditTheme = ({ id, setOpen }) => { // Changed component name to EditTheme
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    setValue,
    formState: { errors },
  } = form;
  const [domaines, setDomaines] = useState([]);
  const { state } = useUserContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await UserApi.getInit();
        setDomaines(response?.data?.domaines);
      } catch (error) {
        console.error("Failed to fetch domaines:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTheme() { // Changed function name to fetchTheme
      try {
        const response = await ThemeApi.getThemeById(id); // Adjusted API call to get theme by ID
        const theme = response?.data;
        if (theme) {
          Object.keys(theme).forEach((key) => {
            if (schema.shape[key]) {
              setValue(key, theme[key].toString());
            }
          });
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    }
    fetchTheme();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const editThemeLoading = toast.loading(
      "Updating theme in progress...",
    );
    try {
      const response = await ThemeApi.updateTheme(id, data); // Adjusted API call to update theme
      if (response.data && response?.status === 200) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>
                The theme updated successfully
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
    toast.dismiss(editThemeLoading);
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
          name='intitule_theme'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intitulé Theme</FormLabel>
              <FormControl>
                <Input
                  placeholder='Intitulé Theme'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='duree_formation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durée Formation</FormLabel>
              <FormControl>
                <Input
                  placeholder='Durée Formation'
                  {...field}
                />
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
                    <SelectItem value='1'>Active</SelectItem>
                    <SelectItem value='0'>Inactive</SelectItem>
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

export default EditTheme;
