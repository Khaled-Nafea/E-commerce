"use server"
import { AddressFormData } from "@/schemas/checkoutSchema";
import { getToken } from "../utilities";
import { ChangePasswordFormData, UpdateProfileFormData } from '@/schemas/authSchemas';

export const addAddress = async (data: AddressFormData) => {
    const token = await getToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: token as string,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const getAddresses = async () => {
    const token = await getToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        headers: { token: token as string },
    });
    return response.json();
}

export const deleteAddress = async (addressId: string) => {
    const token = await getToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
        method: "DELETE",
        headers: { token: token as string },
    });
    return response.json();
}

export const updateAddress = async (id: string, data: AddressFormData) => {
    const token = await getToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: token as string,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const changePassword = async (data: ChangePasswordFormData) => {
    const token = await getToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: token as string,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const updateProfile = async (data: UpdateProfileFormData) => {
    const token = await getToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: token as string,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}