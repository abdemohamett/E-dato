'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import { useCallback, useState } from "react"
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation'

import {BsGithub, BsGoogle} from 'react-icons/bs'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-hot-toast"

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"

interface InputProps {
  required?: boolean;
}


const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
})

type Variant = 'LOGIN' | 'REGISTER';
type Input = z.infer<typeof formSchema>;

const AuthForm: React.FC<InputProps> = ({
  required,
}) => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // const form = useForm<Input>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     name: '',
  //     email: '',
  //     password: ''
  //   }
  // })

  const {
    register,
    handleSubmit,
    // formState: {
    //   errors: FieldErrors,
    // }
  } = useForm<Input>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const onSubmit = (data: Input) => {
    setIsLoading(true);
  
    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', {
        ...data,
        redirect: false,
      }))
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          toast.success('Registered.')
          router.push('/dashboard')
        }
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          toast.success('Logged.')
          router.push('/create')
        }
      })
      .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/')
        }
      })
      .finally(() => setIsLoading(false));
  } 

  return (
    <>
    <nav className="ml-auto -mt-4 px-3">
    <ThemeToggle/>
    </nav>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Card className="md:w-auto md:mx-auto mx-2">
        <CardHeader>
      <CardTitle>{variant === 'LOGIN' ? 'Login' : 'Register'}</CardTitle>
          <CardDescription>{variant === 'LOGIN' ? 'Welcome back.' : 'Start the journey with us today.'}</CardDescription>
        </CardHeader>
       <CardContent>
      {/* <Form  {...form}> */}
      <form 
          className="space-y-6" 
          onSubmit={handleSubmit(onSubmit)}
          >
           {variant === 'REGISTER' && (
          // <FormField
          //     control={form.control}
          //     name="name"
          //     render={({ field }) => (
          //       <FormItem>
          //         <FormLabel>Name</FormLabel>
          //             <FormControl>
          //               <Input  disabled={isLoading} placeholder="Name" {...field} />
          //             </FormControl>
          //         <FormMessage />
          //       </FormItem>
          //     )}
          //   />
          <div className="gap-y-6">
          <Label className="pt-8">Name</Label>
          <Input 
          placeholder="Name"
          id="name" 
          {...register('name', { required })}
          required
          disabled={isLoading}
          className={cn(
          // errors['name'] && 'focus:ring-rose-500',
          )}
          />
          </div>
            )}
          {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} placeholder="example@gmail.com" {...field} />
                      </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="gap-y-3">
            <Label className="pt-8">Email</Label>
          <Input 
          placeholder="Email address"
          id="email" 
          {...register('email', { required })}
          required
          disabled={isLoading}
          type="email"
          className={cn(
            ``
          // errors['email'] && 'focus:ring-rose-500',
          )}
          />
          </div>
          {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type="password" placeholder="Password" {...field} />
                      </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          <div className="gap-y-3">
          <Label className="pt-8">Password</Label>
          <Input 
          placeholder="Password"
          id="password" 
          {...register('password', { required })}
          required
          disabled={isLoading}
          type="password"
          className={cn(
          // errors['password'] && 'focus:ring-rose-500',
          )}
          />
         </div>
            <div >
              <Button disabled={isLoading} className="w-full" size={"sm"}>
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
              </Button>
            </div>
        </form>
      {/* </Form> */}
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="space-y-2">
      <Button onClick={() => socialAction('google')} className="w-full" size={'sm'} variant="outline" type="button" disabled={isLoading}>
        {/* {isLoading ? ( */}
          {/* <BsGoogle className="mr-2 h-4 w-4 animate-spin" /> */}
          {/* ) : ( */}
            {/* )}{" "} */}
            <BsGoogle disabled={isLoading} className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button onClick={() => socialAction('github')} className="w-full" size='sm' variant="outline" type="button" disabled={isLoading}>
            <BsGithub disabled={isLoading} className="mr-2 h-4 w-4" />
        Github
      </Button>
        </div>
           <div 
          className="
          flex 
          gap-2 
          justify-center 
          text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN' ? 'New to Edato?' : 'Already have an account?'} 
          </div>
          <div 
            onClick={toggleVariant} 
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
        
      </CardContent>
      </Card>
      
    </div>
    </>
  )
}

export default AuthForm