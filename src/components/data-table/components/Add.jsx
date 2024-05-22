import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer.jsx";
import {useMediaQuery} from "@react-hook/media-query";
import {Button} from "@/components/ui/button.jsx";


export const Add = ({open , setOpen , addAction , name , actionName = "Add"}) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    return (
        <>
            {!isDesktop ? <Dialog open={open} onOpenChange={setOpen} className={'w-full overflow-auto'}>
                <DialogTrigger asChild>
                    <Button variant="outline">{actionName} {name} </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] ">
                    <DialogHeader>
                        <DialogTitle>{actionName} {name}</DialogTitle>
                        <DialogDescription className={'w-full'}>
                        </DialogDescription>
                    </DialogHeader>
                    <>
                        {addAction(setOpen)}
                    </>
                </DialogContent>
            </Dialog> : <Drawer open={open} onOpenChange={setOpen} >
                <DrawerTrigger asChild>
                    <Button variant="outline">{actionName} {name}</Button>
                </DrawerTrigger>
                <DrawerContent className={'w-5/6 mx-auto'}>
                    <DrawerHeader className="text-left">
                        <DrawerTitle> {actionName} {name}</DrawerTitle>
                        <DrawerDescription >
                        </DrawerDescription>
                    </DrawerHeader>
                    <>
                        {addAction(setOpen)}
                    </>
                    <DrawerFooter className="pt-2">
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>}</>
    )
}
