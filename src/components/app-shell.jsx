import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar.jsx'
import useIsCollapsed from '@/hooks/use-is-collapsed.jsx'
import UserApi from "@/services/Api/UserApi.js";
import {useUserContext} from "@/context/UserContext.jsx";
import {useEffect} from "react";

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
const {dispatch} = useUserContext();
    useEffect(() => {
        const fetchInit = async()=>
        {
            const response =await UserApi.getInit()
            dispatch({
                type : 'SET_INIT',
                payload :response.data
            })
        }

        fetchInit()
    }, []);
  return (
      <div className='relative h-full overflow-hidden bg-background'>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main
            id='content'
            className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
        >
          <Outlet />
        </main>
      </div>
  )
}
