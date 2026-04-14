"use server"
import { LoginFormData, RegisterFormData } from "@/schemas/authSchemas"

export const register = async (data: RegisterFormData) => {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const login = async (data: LoginFormData) => {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

