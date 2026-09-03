
"use client";

import React from "react";
import {
    Person,
    Envelope,
    TrashBin,
    CirclePause,
} from "@gravity-ui/icons";
import { deleteUser } from "@/lib/api/admin/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



const UsersCard = ({ users }) => {
    const router = useRouter()
    const handleDelete = async (userId) => {
        try {
            const result = await deleteUser(userId);

            console.log(result);
        } catch (error) {
            console.error(error);
        }
        if (handleDelete) {
             router.refresh()
            toast.success('User Delete SuccessFully')

        }
        if (!handleDelete) {
            toast.error('Something went wrong')
        }

    };






    const handleSuspend = (user) => {
        console.log("Suspend user:", user);
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F766E]/10">
                        <Person className="h-6 w-6 text-[#0F766E]" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            User Management
                        </h2>
                        <p className="text-sm text-slate-500">
                            Manage all registered users of NovaCare
                        </p>
                    </div>
                </div>
            </div>

            {/* User Count */}
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <div>
                    <p className="text-sm text-slate-500">
                        Total Users
                    </p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">
                        {users.length}
                    </p>
                </div>

                <div className="rounded-xl bg-[#0F766E]/10 px-4 py-2 text-sm font-semibold text-[#0F766E]">
                    All Users
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                                    >
                                        {/* User */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-slate-100">
                                                    {user.image ? (
                                                        <img
                                                            src={user.image}
                                                            alt={user.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#0F766E]">
                                                            {user.name
                                                                ?.charAt(0)
                                                                ?.toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {user.name}
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        ID: {user._id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Envelope className="h-4 w-4 text-slate-400" />
                                                {user.email}
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="px-6 py-5">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${user.role === "admin"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : user.role === "doctor"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-emerald-100 text-emerald-700"
                                                    }`}
                                            >
                                                {user.role || "patient"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-2">
                                        
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                                >
                                                    <TrashBin className="h-4 w-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                                <Person className="h-7 w-7 text-slate-400" />
                                            </div>

                                            <p className="font-semibold text-slate-700">
                                                No users found
                                            </p>

                                            <p className="mt-1 text-sm text-slate-400">
                                                There are no registered users yet.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="divide-y divide-slate-100 md:hidden">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user._id}
                                className="p-5"
                            >
                                {/* User Info */}
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100">
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center font-bold text-[#0F766E]">
                                                {user.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-slate-900">
                                            {user.name}
                                        </p>

                                        <p className="truncate text-sm text-slate-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="mt-4">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${user.role === "admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : user.role === "doctor"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-emerald-100 text-emerald-700"
                                            }`}
                                    >
                                        {user.role || "patient"}
                                    </span>
                                </div>

                                {/* Buttons */}
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                

                                    <button
                                        onClick={() =>
                                            handleDelete(user)
                                        }
                                        className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                    >
                                        <TrashBin className="h-4 w-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-16 text-center">
                            <p className="font-semibold text-slate-700">
                                No users found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersCard;

