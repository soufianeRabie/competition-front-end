import { Button } from "@/components/ui/button"
import UserContext from "@/context/UserContext.jsx";
import {router} from "@/router/index.jsx";
import {Toaster} from "sonner";
import {RouterProvider} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <>
                <UserContext>
                    {/*<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">*/}
                        <RouterProvider router={router}/>
                    {/*</ThemeProvider>*/}
                </UserContext>
                <Toaster/>
            </>
        </div>
    )
}
