import {
    Select,
    SelectContent, SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import UserApi from "@/services/Api/UserApi.js";
import {useEffect, useState} from "react";

export const SelectSpecifiqueGroup = ({setPrintData}) => {


    const [regions, setRegions] = useState();
    useEffect(() => {
        const fetchRegions = async ()=>
        {
            const regions = await UserApi.getRegions();
            setRegions(regions?.data)

        }

        fetchRegions()
    }, []);


    const onRegionChange = (value)=>
    {
        const filteredRegions = regions.filter((region)=>region?.id === parseInt(value) )
        console.log(filteredRegions)
        setPrintData()
    }

    const displayGroups = ()=>
    {
        return regions?.map((region)=><SelectItem key={region?.id}
                                                value={region?.id.toString()}>{region.nom_region}</SelectItem>)
    }
    return (
        <>
            <Select onValueChange={(value)=>onRegionChange(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a group" />
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
