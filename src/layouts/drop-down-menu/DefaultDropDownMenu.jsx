import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu.jsx";
import {Button} from "../../components/ui/button.jsx";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react'
import UserApi from "../../services/Api/UserApi.js";
import {LOGIN_ROUTE} from "../../router/index.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "@/context/UserContext.jsx";
import {logout} from "@/library/index.jsx";

export default function DefaultDropDownMenu({children}) {
  const navigate = useNavigate()
  const {state, dispatch} = useUserContext()


  return <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button> <User className="mr-2 h-4 w-4"/>{user.firstname}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          {children}
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4"/>
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
}
