import { Separator } from '@/components/ui/separator'
import {getProfileToUpdate} from "@/library/index.jsx";
import {useUserContext} from "@/context/UserContext.jsx";


export default function SettingsProfile() {

    const {state} = useUserContext()
    const user = state?.user ;
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className='my-4' />
        <div className={'w-5/6 mx-auto'}>
            {getProfileToUpdate(user?.role_name)}

        </div>
    </div>
  )
}
