"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import Link from "next/link"
import { RegisterFormData, registerSchema } from "@/schemas/authSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { register } from "@/services/authServices"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import { Star, Truck, Shield, UserPlus, Facebook } from "lucide-react"

export default function page() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const handlePasswordChange = (value: string) => {
    let strength = 0;
    if (value.length >= 8) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^a-zA-Z0-9]/.test(value)) strength++;
    setPasswordStrength(strength);
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return { label: "Weak", color: "#e53e3e", width: "25%" };
    if (passwordStrength === 1) return { label: "Fair", color: "#dd6b20", width: "50%" };
    if (passwordStrength === 2) return { label: "Good", color: "#d69e2e", width: "75%" };
    return { label: "Strong", color: "#38a169", width: "100%" };
  };

  const handleSubmit = async (data: RegisterFormData) => {
    if (!agreed) {
      toast.error("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    const response = await register(data);
    if (response?.message === "success") {
      toast.success("Registered successfully", {
        style: {
          background: "#22a74f",
          color: "white",
          border: "none",
        },
      });

      router.push("/login");
    } else {
      toast.error("Please agree to the Terms of Service and Privacy Policy", {
        style: {
          background: "#ef4444",
          color: "white",
          border: "none",
        },
      });
    }
  };

  const strength = getStrengthLabel();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome to <span className="text-[#22a74f]">FreshCart</span>
            </h1>
            <p className="text-gray-500 mt-2 text-base">
              Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                icon: <Star size={20} className="text-white" />,
                title: "Premium Quality",
                desc: "Premium quality products sourced from trusted suppliers.",
              },
              {
                icon: <Truck size={20} className="text-white" />,
                title: "Fast Delivery",
                desc: "Same-day delivery available in most areas",
              },
              {
                icon: <Shield size={20} className="text-white" />,
                title: "Secure Shopping",
                desc: "Your data and payments are completely secure",
              },
            ].map((item, i) => ( 
            <div key={i} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#22a74f]"
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <circle cx="20" cy="15" r="8" fill="#9CA3AF" />
                  <ellipse cx="20" cy="35" rx="13" ry="9" fill="#9CA3AF" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Sarah Johnson</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                   <Star key={i} size={16} className="text-[#f6c90e] fill-[#f6c90e]" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic">
              "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border border-gray-200 rounded-2xl p-8 shadow-sm bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
            <p className="text-gray-500 text-sm mt-1">Start your fresh journey with us today</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <Button
              type="button"
              className="flex items-center bg-white justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="text-[#EA4335] font-bold text-lg">G</span>
              Google
            </Button>
            <Button
              type="button"
              className="flex items-center bg-white justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
              <Facebook size={20} className="text-[#1877F2] fill-[#1877F2]" />
              Facebook
            </Button>
          </div>

          <div className="relative flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Name<span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Ali"
                    autoComplete="off"
                    className="mt-1 border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

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
                    placeholder="ali@example.com"
                    autoComplete="off"
                    className="mt-1 border-gray-300 rounded-lg"
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
                    placeholder="create a strong password"
                    autoComplete="off"
                    className="mt-1 border-gray-300 rounded-lg"
                    onChange={(e) => {
                      field.onChange(e);
                      handlePasswordChange(e.target.value);
                    }}
                  />

                  <div className="mt-1.5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-300`} style={{ width: strength.width, backgroundColor: strength.color }} />
                      </div>
                      <span className="ml-2 text-xs font-medium" style={{ color: strength.color }}>
                        {strength.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Must be at least 8 characters with numbers and symbols</p>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Confirm Password<span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="confirm your password"
                    autoComplete="off"
                    className="mt-1 border-gray-300 rounded-lg"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Phone Number<span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="01(X) XXX-XXXXX"
                    autoComplete="off"
                    className="mt-1 border-gray-300 rounded-lg"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-green-600"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <span className="cursor-pointer hover:underline text-[#22a74f]">Terms of Service</span> and <span className="cursor-pointer hover:underline text-[#22a74f]">Privacy Policy</span> <span className="text-red-500">*</span>
              </label>
            </div>

            <Button
              type="submit"
              className="cursor-pointer w-full flex items-center justify-center gap-2 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:opacity-90 hover:scale-[0.99] mt-2 bg-[#22a74f]">
              <UserPlus size={18} />
              Create My Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:underline text-[#22a74f] cursor-pointer">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}