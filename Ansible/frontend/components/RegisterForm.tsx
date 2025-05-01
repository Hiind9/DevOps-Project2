"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const FormSchema = z
  .object({
    email: z.string().min(1, "email is required.").email("invalid email."),
    password: z
      .string()
      .min(1, "password is required.")
      .min(8, "password must be 8 characters atleast."),
    confirmPassword: z.string().min(1, "password confirmation is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "password do not match.",
  });

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    try {
      // Call the proxy endpoint on your Next.js server
      const res = await axios.post("/api/auth/signup", values);

      if (res.data.msg) {
        setError(null);
        setSuccess(res.data.msg);
      }

      localStorage.setItem("auth_token", res.data.token);

      router.push("/login");
    } catch (error) {
      setSuccess(null);
      setError("bad request");
      console.error("There was some error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Register
        </Button>
        {success && (
          <div className="text-green-500 bg-green-200 p-1 rounded">{success}</div>
        )}
        {error && (
          <div className="text-red-500 bg-red-200 p-1 rounded">{error}</div>
        )}
      </form>
    </Form>
  );
}
