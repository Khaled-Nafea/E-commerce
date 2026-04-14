"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import Link from "next/link"
import { LoginFormData, loginSchema } from "@/schemas/authSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Truck, Shield, Facebook } from "lucide-react"
import Imge from "../../../../public/2e5810ff3e-e750761ebcd4ae5907db.png"
import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { login } from "@/services/authServices"

export default function page() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const handleSubmit = async (data: LoginFormData) => {
    const apiData = await login(data)

    if (apiData.message === "success") {
      const decoded: { id: string } = jwtDecode(apiData.token)
      localStorage.setItem("userId", decoded.id)
    }

    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.ok) {
      toast.success("Login successfully", {
        style: {
          background: "#22a74f",
          color: "white",
          border: "none",
        },
      });
      router.push("/")
    } else {
      toast.error("Invalid email or password", {
        style: {
          background: "#ef4444",
          color: "white",
          border: "none",
        },
      });
    }
  };


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">


        <div className="space-y-6 flex flex-col items-center justify-center">
          <div className="w-full rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center relative overflow-hidden">
            <img
              src={Imge.src}
              alt="FreshCart groceries"
              className="w-full h-full object-cover max-h-[260px]"
            />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 leading-snug">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h1>
            <p className="text-gray-500 text-sm">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <Truck size={16} className="text-[#22a74f]" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <Shield size={16} className="text-[#22a74f] fill-[#22a74f]" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#22a74f]">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-8 lg:p-12 shadow-sm bg-white">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2"><span className="text-[#4B9E39]">Fresh</span><span>Cart</span></h2>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to continue your fresh shopping experience</p>
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <Button
              type="button"
              className="flex items-center bg-white justify-center gap-2 border border-gray-300 rounded-lg w-full h-10 text-md font-medium text-gray-700 hover:bg-[#F0FDF4] hover:border-[#4B9E39] transition-colors cursor-pointer">
              <span className="text-[#EA4335] font-bold text-lg">G</span>
              Google
            </Button>
            <Button
              type="button"
              className="flex items-center bg-white justify-center gap-2 border border-gray-300 rounded-lg w-full h-10 text-md font-medium text-gray-700 hover:bg-[#F0FDF4] hover:border-[#4B9E39] transition-colors cursor-pointer">
              <Facebook size={20} className="text-[#1877F2] fill-[#1877F2]" />
              Facebook
            </Button>
          </div>

          <div className="relative flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">OR CONTINUE WITH EMAIL</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Email<span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="off"
                    className="mt-1 border-gray-300 rounded-lg h-10"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Password<span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                    className="mt-1 border-gray-300 rounded-lg h-10"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-green-600"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Keep me signed in
              </label>
            </div>

            <Button
              type="submit"
              className="cursor-pointer w-full h-10 flex items-center justify-center gap-2 text-white font-semibold text-xs py-3 px-4 rounded-lg transition-all duration-200 hover:opacity-90 hover:scale-[0.99] mt-2 bg-[#22a74f]">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            New to FreshCart?{" "}
            <Link href="/register" className="font-medium hover:underline text-[#22a74f] cursor-pointer">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}