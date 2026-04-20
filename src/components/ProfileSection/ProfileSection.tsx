"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, UpdateProfileFormData } from "@/schemas/authSchemas";
import { updateProfile } from "@/services/ProfileServices";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@base-ui/react";
import { User, Save } from "lucide-react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function ProfileSection() {
    const [profileLoading, setProfileLoading] = useState(false);
  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    form.reset({
      name: "",
      email: "",
      phone: "",
    });
  }, []);

  const handleSubmit = async (data: UpdateProfileFormData) => {
   setProfileLoading(true);
    const response = await updateProfile(data);
    console.log(response);
    if (response.message === "fail") {
      form.reset();
      toast.error("Failed to update profile", {
        duration: 3000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
    else{
      form.reset();
      toast.success("Password changed successfully", {
        duration: 3000,
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
       signOut({redirect: true, callbackUrl: '/'});
    }
    setProfileLoading(false);
    
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
          <User className="text-green-600 w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Profile Information
          </h2>
          <p className="text-sm text-gray-500">
            Update your personal details
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Full Name</FieldLabel>
              <Input
                {...field}
                type="text"
                placeholder="Enter your name"
                className="mt-2 h-11 rounded-xl border-gray-200"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email Address</FieldLabel>
              <Input
                {...field}
                type="email"
                placeholder="Enter your email"
                className="mt-2 h-11 rounded-xl border-gray-200"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Phone Number</FieldLabel>
              <Input
                {...field}
                type="tel"
                placeholder="01xxxxxxxxx"
                className="mt-2 h-11 rounded-xl border-gray-200"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={profileLoading}
        >
          {profileLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">
          Account Information
        </h3>

        <div className="flex justify-between text-sm text-gray-500">
          <span>User ID</span>
          <span>69d8fee7b8a2062cafec09fa</span>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Role</span>
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
            User
          </span>
        </div>
      </div>
    </div>
  );
}