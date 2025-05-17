"use client";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";
import { apiUri } from "@/apollo-client/client";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await axios.post(`${apiUri}/auth/login`, values, {
        withCredentials: true,
      });
      console.log(result);
      toast.success("Login successful", { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to login", { position: "top-right" });
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="max-w-lg mx-auto mt-6 space-y-8 border p-5 rounded-md">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isSubmitting}
                    placeholder="Enter your email"
                    {...field}
                  />
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
                  <Input
                    type="password"
                    disabled={isSubmitting}
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="w-full text-white"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
      <GoogleLoginButton />
    </div>
  );
};

export default LoginForm;
