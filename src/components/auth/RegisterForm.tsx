'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import CardWrapper from "./CardWrapper"
import { RegisterSchema } from "@/schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { z } from 'zod'


const RegisterForm = () => {

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    //Logic to send fata to the backend
    //Here data is already validated
    console.log(data)
  }

  return (
    <CardWrapper
      label="Crea tu cuenta"
      title="Registro"
      backButtonHref="/auth/login"
      backButtonLabel="¿Ya tienes una cuenta? Inicia sesión"
    >

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 " >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <input {...field} type="text" placeholder="Alumno" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input {...field} type="email" placeholder="usuario@morelia.tecnm.mx" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <input {...field} type="password" placeholder="********" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Contraseña</FormLabel>
                <FormControl>
                  <input {...field} type="password" placeholder="********" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark">
            Registrarse
          </Button>
        </form>
      </Form>

    </CardWrapper>
  )
}

export default RegisterForm