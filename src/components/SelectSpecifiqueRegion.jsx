import {
    Select,
    SelectContent, SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import {useUserContext} from "@/context/UserContext.jsx";

export const SelectSpecifiqueRegion = ({setRegion}) => {

    const {state : {regions}} = useUserContext()

    const onRegionChange = (value)=>
    {
        setRegion(value)
;    }

    const displayGroups = ()=>
    {
        return regions?.map((region)=><SelectItem key={region?.id}
                                                value={region}>{region.nom_region}</SelectItem>)
    }
    return (
        <>
            <Select onValueChange={(value)=>onRegionChange(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>regions</SelectLabel>
                        {displayGroups()}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}
