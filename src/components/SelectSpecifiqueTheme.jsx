import {
    Select,
    SelectContent, SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import {useUserContext} from "@/context/UserContext.jsx";
import {useState} from "react";
import {Button} from "@/components/custom/button.jsx";
import IntervenantApi from "@/services/Api/IntervenantApi.js";

export const SelectSpecifiqueTheme = ({ id}) => {

    const {state : {themes}} = useUserContext()
    const [theme, setTheme] = useState()

    const onRegionChange = (value)=>
    {
        setTheme(value)
        console.log(value)
        console.log(id , value )
;    }

    const displayGroups = ()=>
    {

        return themes?.map((region)=><SelectItem key={region?.id}
                                                value={region}>{region.intitule_theme}</SelectItem>)
    }

    const  handleAffectTheme = async ()=>
        {
    const response = await IntervenantApi.PotentialIntervenants({theme_id : theme?.id , intervenant_id : id})

            console.log(response.data);
        }

    return (
        <>
            <Select onValueChange={(value)=>onRegionChange(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>regions</SelectLabel>
                        {displayGroups()}
                    </SelectGroup>
                </SelectContent>
                <Button onClick={handleAffectTheme} className={'my-3 w-full'}> Affect</Button>
            </Select>
        </>
    )
}
