"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/schemas/authSchemas";
import { changePassword } from "@/services/ProfileServices";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@base-ui/react";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import ProfileSection from "@/components/ProfileSection/ProfileSection";
import { signOut } from "next-auth/react";

type FormData = {
  currentPassword: string;
  password: string;
  rePassword: string;
};

export default function SettingsPage() {
  const [passwordLoading, setPasswordLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    setPasswordLoading(true);
    const response = await changePassword(data);
    console.log(response);
    if (response.message === "fail") {
      form.reset();
      toast.error("Failed to change password", {
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
    setPasswordLoading(false);
  };

  return (
    <>
    <ProfileSection />
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
          <Lock className="text-orange-500 w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Change Password
          </h2>
          <p className="text-sm text-gray-500">
            Update your account password
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Controller
          name="currentPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm text-gray-700">
                Current Password
              </FieldLabel>

              <Input {...field} type="password" placeholder="Enter your current password" className="mt-2 h-11 rounded-xl border-gray-200" />

              {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm text-gray-700">
                New Password
              </FieldLabel>

              <Input {...field} type="password" placeholder="Enter your new password" className="mt-2 h-11 rounded-xl border-gray-200" />

              <p className="text-xs text-gray-400 mt-1">
                Must be at least 8 characters
              </p>

              {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
            </Field>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="rePassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm text-gray-700">
                Confirm New Password
              </FieldLabel>

              <Input {...field} type="password" placeholder="Confirm your new password" className="mt-2 h-11 rounded-xl border-gray-200" />

              {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
            </Field>
          )}
        />

        {/* Button */}
        <Button 
          type="submit"
          className={`mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${passwordLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={passwordLoading}
        >
          <Lock className="w-4 h-4" />
          {passwordLoading ? "Changing..." : "Change Password"}
        </Button>
      </form>
    </div>
    </>
  );
}
