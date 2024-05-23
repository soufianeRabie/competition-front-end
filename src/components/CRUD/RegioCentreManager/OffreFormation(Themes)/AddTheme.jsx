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
import IntervenantApi from "../../../../services/Api/IntervenantApi";

const schema = z.object({
  domaines_id: z.string().nonempty(),
  intitule_theme: z.string().nonempty(), // Adjusted schema to match theme data structure
  duree_formation: z.string().nonempty(), // Added duree_formation to schema
  status: z.string().nonempty(), // Added status to schema
});

const AddTheme = ({ setOpen }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    formState: { errors },
  } = form;

  const [domaines, setDomaines] = useState([]);
  const { state } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserApi.getInit();
        setDomaines(response?.data?.domaines);
      } catch (error) {
        console.error("Failed to fetch domaines:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const addThemeLoading = toast.loading("Adding theme in progress...");
    try {
      const response = await ThemeApi.addTheme(data);
      if (response.data && response?.status === 201) {
        toast.success("Theme added successfully");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    }

    toast.dismiss(addThemeLoading);
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
          name='intitule_theme'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intitulé Theme</FormLabel>
              <FormControl>
                <Input
                  placeholder='Intitulé Theme'
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
          name='duree_formation'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durée Formation</FormLabel>
              <FormControl>
                <Input
                  placeholder='Durée Formation'
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
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    // Convert the selected value to a boolean
                    const newValue = value === "active" ? "active" : "inactive";
                    // Update the status field based on the selected value
                    field.onChange(newValue==="active" ? "1" : "0");
                  }}
                  defaultValue='' // Set a default value to prevent initial selection
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='active'>Active</SelectItem>
                    <SelectItem value='inactive'>Inactive</SelectItem>
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

export default AddTheme;
