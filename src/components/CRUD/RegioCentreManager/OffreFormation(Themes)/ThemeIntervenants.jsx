// ThemeIntervenant.js

import React, { useEffect, useState } from "react";
import ThemeApi from "@/services/Api/ThemeApi.js"; // Import ThemeApi instead of CertificationApi
import IntervenantApi from "@/services/Api/IntervenantApi.js"; // Import IntervenantApi
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {SelectSpecifiqueRegion} from "@/components/SelectSpecifiqueRegion.jsx";

const schema = z.object({
  theme_id: z.string().nonempty(),
  intervenant_id: z.string().nonempty(), // Added intervenant_id to schema
});

const ThemeIntervenant = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    formState: { errors },
  } = form;

  const [themes, setThemes] = useState([]);
  const [intervenants, setIntervenants] = useState([]);


  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await ThemeApi.getAllThemes(); // Assuming a method to fetch all themes
        setThemes(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch themes:", error);
      }
    };

    const fetchIntervenants = async () => {
      try {
        const response = await IntervenantApi.getPotentialIntervenants();
        setIntervenants(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch intervenants:", error);
      }
    };

    fetchThemes();
    fetchIntervenants();
  }, []);

  const onSubmit = async (data) => {
    const addIntervenantToThemeLoading = toast.loading(
      "Assigning intervenant to theme...",
    );
    try {
      const response = await ThemeApi.addIntervenantToTheme(data);
      if (response && response.data && response.status === 201) {
        toast.success("Intervenant assigned to theme successfully");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    }

    toast.dismiss(addIntervenantToThemeLoading);
  };


  return (
   <>
     <Form {...form}>
       {JSON.stringify(errors)}
       <form
           onSubmit={form.handleSubmit(onSubmit)}
           className={"h-96 overflow-auto"}
       >
         <FormField
             control={form.control}
             name='theme_id'
             render={({ field }) => (
                 <FormItem>
                   <FormLabel>Theme</FormLabel>
                   <Select
                       onValueChange={field.onChange}
                       defaultValue={field.value}
                   >
                     <FormControl>
                       <SelectTrigger>
                         <SelectValue placeholder='Select Theme' />
                       </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                       {themes.map((theme) => (
                           <SelectItem
                               key={theme.id.toString()}
                               value={theme.id.toString()}
                           >
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
                             {intervenant.name}
                           </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                   <FormMessage />
                 </FormItem>
             )}
         />
         <Button onCick={()=>setIsOpen(true)} type='submit'>Assign Intervenant to Theme</Button>
       </form>
     </Form>

   </>
  );
};

export default ThemeIntervenant;
