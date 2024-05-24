import {
    Select,
    SelectContent, SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";

export const SelectFilterBy = ({filtrageItem = [] , setFiltredBy}) => {


    const onRegionChange = (value)=>
    {
            setFiltredBy(value);
    }

    const displayItem = ()=>
    {
        return filtrageItem?.map((item , key)=><SelectItem key={key}
                                                  value={filtrageItem[key]}>{filtrageItem[key]}</SelectItem>)
    }
    return (
        <>
            <Select onValueChange={(value)=>onRegionChange(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="filter by " />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {displayItem()}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}
