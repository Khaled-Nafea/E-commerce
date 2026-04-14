"use client"
import { useState, useEffect } from "react"
import { MapPin, X, Plus, Phone, Pencil, Trash2 } from "lucide-react"
import { Button } from "@base-ui/react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addressSchema, AddressFormData } from "@/schemas/checkoutSchema"
import { addAddress, deleteAddress, getAddresses, updateAddress } from "@/services/ProfileServices"

interface Address {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [currentId, setCurrentId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [editingAddress, setEditingAddress] = useState<Address | null>(null)

    const form = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: { name: "", details: "", phone: "", city: "" },
    })

    useEffect(() => {
        const fetchAddresses = async () => {
            const response = await getAddresses()
            if (response.status === 'success') {
                setAddresses(response.data)
            }
            setIsLoading(false)
        }
        fetchAddresses()
    }, [])

    const handleOpenAdd = () => {
        setEditingAddress(null)
        form.reset({ name: "", details: "", phone: "", city: "" })
        setIsModalOpen(true)
    }

    const handleOpenEdit = (addr: Address) => {
        setEditingAddress(addr)
        form.reset({ name: addr.name, details: addr.details, phone: addr.phone, city: addr.city })
        setIsModalOpen(true)
    }
    const handleClose = () => {
        setIsModalOpen(false)
        setEditingAddress(null)
        form.reset()
    }

    const handleSubmit = async (data: AddressFormData) => {
    if (editingAddress) {
        const response = await updateAddress(editingAddress._id, data)
        if (response.status === 'success') {
            const updated = await getAddresses()
            if (updated.status === 'success') {
                setAddresses(updated.data)
                handleClose()
            }
        }
    } else {
        const response = await addAddress(data)
        if (response.status === 'success') {
            setAddresses(response.data)
            handleClose()
        }
    }
}
    const handleDelete = async (addressId: string) => {
        setIsDeleting(true)
        setCurrentId(addressId)
        const response = await deleteAddress(addressId)
        if (response.status === 'success') {
            setAddresses(response.data)
        }
        setIsDeleting(false)
        setCurrentId(null)
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-7">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">My Addresses</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your saved delivery addresses</p>
                </div>
                <Button onClick={handleOpenAdd} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    <Plus className="w-4 h-4" /> Add Address
                </Button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <MapPin className="w-7 h-7 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900">No Addresses Yet</h3>
                    <p className="text-sm text-gray-500 text-center max-w-xs leading-relaxed">
                        Add your first delivery address to make checkout faster and easier.
                    </p>
                    <Button onClick={handleOpenAdd} className="mt-2 flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors cursor-pointer">
                        <Plus className="w-4 h-4" /> Add Your First Address
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                        <div key={addr._id} className="flex items-start justify-between p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                            <div className="flex gap-3">
                                <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                    <MapPin className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-gray-900">{addr.name}</p>
                                    <p className="text-sm text-gray-500 mt-0.5">{addr.details}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <Phone className="w-3.5 h-3.5" />
                                            {addr.phone}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {addr.city}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <Button onClick={() => handleOpenEdit(addr)} className="w-8 h-8 rounded-full bg-gray-100 group hover:bg-green-100 flex items-center justify-center transition-colors cursor-pointer">
                                    <Pencil className="w-3.5 h-3.5 text-gray-600 group-hover:text-green-600" />
                                </Button>
                                <Button onClick={() => handleDelete(addr._id)} className="w-8 h-8 rounded-full bg-gray-100 group hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer" disabled={isDeleting}>
                                    {isDeleting && addr._id === currentId ? (
                                        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Trash2 className="w-3.5 h-3.5 text-gray-600 group-hover:text-red-600" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md p-7 shadow-xl">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-medium">
                                {editingAddress ? "Edit Address" : "Add New Address"}
                            </h3>
                            <Button onClick={handleClose} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name} className="block text-sm text-gray-600 mb-1.5">
                                            Address Name <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <Input {...field} id={field.name} type="text" placeholder="e.g. Home, Office" className="w-full! border! bg-white! border-gray-200! rounded-lg! py-5! px-3! text-sm! outline-none! focus:border-green-500! focus:ring-0!" />
                                        {fieldState.error?.message && <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="details"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name} className="block text-sm text-gray-600 mb-1.5">
                                            Street Address <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <div className="relative">
                                            <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                                            <Textarea {...field} id={field.name} rows={3} placeholder="Street name, building number, floor, apartment..." className="w-full! border! bg-white! border-gray-200! rounded-xl! py-3! pl-10! pr-4! text-sm! outline-none! focus:border-green-500! focus:ring-0! resize-none!" />
                                        </div>
                                        {fieldState.error?.message && <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>}
                                    </Field>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <Controller
                                    name="phone"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name} className="block text-sm text-gray-600 mb-1.5">
                                                Phone <span className="text-red-500">*</span>
                                            </FieldLabel>
                                            <div className="relative">
                                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input {...field} id={field.name} type="tel" placeholder="01xxxxxxxxx" className="w-full! border! bg-white! border-gray-200! rounded-lg! py-5! pl-10! pr-4! text-sm! outline-none! focus:border-green-500! focus:ring-0!" />
                                            </div>
                                            {fieldState.error?.message && <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="city"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name} className="block text-sm text-gray-600 mb-1.5">
                                                City <span className="text-red-500">*</span>
                                            </FieldLabel>
                                            <div className="relative">
                                                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input {...field} id={field.name} type="text" placeholder="e.g. Cairo" className="w-full! border! bg-white! border-gray-200! rounded-lg! py-5! pl-10! pr-4! text-sm! outline-none! focus:border-green-500! focus:ring-0!" />
                                            </div>
                                            {fieldState.error?.message && <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>}
                                        </Field>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <Button type="button" onClick={handleClose} className="py-2.5 rounded-lg bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer">
                                    Cancel
                                </Button>
                                <Button type="submit" className="py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium cursor-pointer">
                                    {editingAddress ? "Update" : "Add Address"}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}