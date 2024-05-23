import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.jsx";
import {Input} from "../ui/input.jsx";
import {Button} from "../ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {Loader} from "lucide-react";
import {useUserContext} from "../../context/UserContext.jsx";
import {useState} from "react";
import UserApi from "@/services/Api/UserApi.js";
import {HOME_ROUTE} from "@/router/index.jsx";
import {toast} from "sonner";
import {setTokenInLocalStorage} from "@/library/index.jsx";
import {ResetPassword} from "@/components/Auth/ResetPassword.jsx";

const formSchema = z.object({
    email: z.string().email().min(2).max(30),
    password: z.string().min(8).max(30)
})
export default function UserLogin() {
    const [isLogin, setIsLogin] = useState(true)
    const lienText = isLogin ? 'dont have an account register' : 'go to login'
    const navigate = useNavigate()
    const {state , dispatch} = useUserContext()
    const [isOpen, setIsOpen] = useState(false);
    const loadingSentence = isLogin? 'login in progress...' : 'register in progress...'
    const form = useForm({
        resolver: zodResolver(formSchema , ),defaultValues:{
            email : '',
            password : ''
        }
    },)
    const {setError, formState: {isSubmitting}} = form

    // 2. Define a submit handler.
    const onSubmit = async values => {

        const loading = toast.loading(loadingSentence)
       try {
           if(isLogin)
           {
               await UserApi.login(values.email, values.password).then(
                   ({status, data}) => {
                       if (status === 200 && data) {
                           setTokenInLocalStorage(data?.token)
                           dispatch({
                               type : 'SET_INIT',
                               payload :{
                                   user :  data
                               }
                           })
                           navigate(HOME_ROUTE);
                       }else
                       {
                           throw new Error('something went wrong')
                       }
                   }).catch(({response}) => {
                   setError('email', {
                       message: response.data.error || response?.data?.errors?.email?.join()
                   })
               })
           }else
           {
               await UserApi.register(values.email, values.password).then(
                   ({status, data}) => {
                       console.log(data)
                       if (status === 200 && data) {
                           dispatch({
                               type : 'SET_USER',
                               payload :{
                                   user :  data.user
                               }
                           })
                           setTokenInLocalStorage(data?.token)
                           navigate(HOME_ROUTE)
                       }else
                       {
                           throw new Error('something went wrong')
                       }
                   }).catch(({response}) => {
                   setError('email', {
                       message: response.data.errors.email.join()
                   })
               })
           }
       }catch (e)
       {
           setError('email' , {
               message : e?.error?.message
           })
       }

       toast.dismiss(loading)
    }

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type={'password'} placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button className={'mt-2'} disabled={isSubmitting} type="submit">
                    {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {' '} {isLogin ? <span> Login</span> : <span> Register</span>}
                </Button>
            </form>
        </Form>
     <div>
         <span className={'text-blue-900 my-2 cursor-pointer'} onClick={()=>setIsLogin(prevState =>  !prevState)}> {lienText} </span>
     </div>
        <div onClick={()=>setIsOpen(true)}>forget password</div>

        <ResetPassword isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
}
