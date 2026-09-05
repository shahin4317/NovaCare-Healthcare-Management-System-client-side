"use client";

import React, { useState } from "react";
import {
    Person,
    Envelope,
    TrashBin,
    Check,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { upDateStatus } from "@/lib/api/admin/action";

const UsersCard = ({ users }) => {
    const [userList, setUserList] = useState(users || []);
    const [deletingId, setDeletingId] = useState(null);
    const [updatingStatusId, setUpdatingStatusId] =
        useState(null);

    console.log("User List:", userList);

    // =========================
    // DELETE USER
    // =========================
    const handleDelete = async (userId) => {
        try {
            setDeletingId(userId);

            const response = await fetch(
                `https://nova-care-healthcare-management-sys.vercel.app/api/user/${userId}`,
                {
                    method: "DELETE",
                }
            );

            const text = await response.text();

            let result = {};

            try {
                result = text ? JSON.parse(text) : {};
            } catch {
                result = {};
            }

            console.log("Delete result:", result);

            if (!response.ok || !result?.success) {
                throw new Error(
                    result?.message ||
                        "Failed to delete user"
                );
            }

            toast.success(
                "User deleted successfully"
            );

            setUserList((prevUsers) =>
                prevUsers.filter(
                    (user) => user._id !== userId
                )
            );
        } catch (error) {
            console.error(
                "Delete user error:",
                error
            );

            toast.error(
                error?.message ||
                    "Something went wrong"
            );
        } finally {
            setDeletingId(null);
        }
    };

    // =========================
    // UPDATE DOCTOR STATUS
    // =========================
    const handleStatusChange = async (userId) => {
        try {
            setUpdatingStatusId(userId);

            console.log(
                "Doctor User ID:",
                userId
            );

            // user._id -> doctorId
            const result =
                await upDateStatus(userId);

            console.log(
                "Status response:",
                result
            );

            if (!result?.success) {
                throw new Error(
                    result?.message ||
                        "Failed to update doctor status"
                );
            }

            // Update UI
            setUserList((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId
                        ? {
                              ...user,
                              status:
                                  result.status,
                          }
                        : user
                )
            );

            if (result.status === "Active") {
                toast.success(
                    "Doctor verified successfully"
                );
            } else {
                toast.success(
                    "Doctor verification cancelled"
                );
            }
        } catch (error) {
            console.error(
                "Doctor status update error:",
                error
            );

            toast.error(
                error?.message ||
                    "Failed to update doctor status"
            );
        } finally {
            setUpdatingStatusId(null);
        }
    };

    return (
        <div className="w-full">
            {/* ================================= */}
            {/* DESKTOP TABLE */}
            {/* ================================= */}

            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {userList.length > 0 ? (
                                userList.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        {/* USER */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                                                    {user.image ? (
                                                        <img
                                                            src={
                                                                user.image
                                                            }
                                                            alt={
                                                                user.name ||
                                                                "User"
                                                            }
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Person className="h-5 w-5 text-gray-500" />
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {user.name ||
                                                            "Unknown User"}
                                                    </p>

                                                    <p className="text-xs text-gray-400">
                                                        ID:{" "}
                                                        {
                                                            user._id
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* EMAIL */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Envelope className="h-4 w-4 text-gray-400" />

                                                {
                                                    user.email
                                                }
                                            </div>
                                        </td>

                                        {/* ROLE */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                                    user.role ===
                                                    "admin"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : user.role ===
                                                          "doctor"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                            >
                                                {user.role ||
                                                    "patient"}
                                            </span>
                                        </td>

                                        {/* STATUS */}
                                        <td className="px-6 py-4">
                                            {user.role ===
                                            "doctor" ? (
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                        user.status ===
                                                        "Active"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-orange-100 text-orange-700"
                                                    }`}
                                                >
                                                    {user.status ||
                                                        "Not Verified"}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-gray-400">
                                                    —
                                                </span>
                                            )}
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                {/* VERIFY DOCTOR */}
                                                {user.role ===
                                                    "doctor" && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                user._id
                                                            )
                                                        }
                                                        disabled={
                                                            updatingStatusId ===
                                                            user._id
                                                        }
                                                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                                            user.status ===
                                                            "Active"
                                                                ? "border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100"
                                                                : "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                                        }`}
                                                    >
                                                        <Check className="h-4 w-4" />

                                                        {updatingStatusId ===
                                                        user._id
                                                            ? "Updating..."
                                                            : user.status ===
                                                              "Active"
                                                            ? "Cancel Verification"
                                                            : "Verify Doctor"}
                                                    </button>
                                                )}

                                                {/* DELETE */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            user._id
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId ===
                                                        user._id
                                                    }
                                                    className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <TrashBin className="h-4 w-4" />

                                                    {deletingId ===
                                                    user._id
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-12 text-center"
                                    >
                                        <Person className="mx-auto mb-3 h-10 w-10 text-gray-300" />

                                        <p className="font-semibold text-gray-500">
                                            No users found
                                        </p>

                                        <p className="mt-1 text-sm text-gray-400">
                                            There are no
                                            users available.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================================= */}
            {/* MOBILE CARDS */}
            {/* ================================= */}

            <div className="space-y-4 md:hidden">
                {userList.length > 0 ? (
                    userList.map((user) => (
                        <div
                            key={user._id}
                            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                        >
                            {/* USER */}
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={
                                                user.name ||
                                                "User"
                                            }
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <Person className="h-6 w-6 text-gray-500" />
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate font-semibold text-gray-900">
                                        {user.name ||
                                            "Unknown User"}
                                    </h3>

                                    <p className="truncate text-sm text-gray-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* DETAILS */}
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                {/* ROLE */}
                                <div className="rounded-xl bg-gray-50 p-3">
                                    <p className="text-xs font-medium text-gray-400">
                                        Role
                                    </p>

                                    <span
                                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                                            user.role ===
                                            "admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : user.role ===
                                                  "doctor"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-emerald-100 text-emerald-700"
                                        }`}
                                    >
                                        {user.role ||
                                            "patient"}
                                    </span>
                                </div>

                                {/* STATUS */}
                                <div className="rounded-xl bg-gray-50 p-3">
                                    <p className="text-xs font-medium text-gray-400">
                                        Status
                                    </p>

                                    {user.role ===
                                    "doctor" ? (
                                        <span
                                            className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                user.status ===
                                                "Active"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-orange-100 text-orange-700"
                                            }`}
                                        >
                                            {user.status ||
                                                "Not Verified"}
                                        </span>
                                    ) : (
                                        <span className="mt-1 block text-sm text-gray-400">
                                            —
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="mt-4 flex gap-2">
                                {/* VERIFY */}
                                {user.role ===
                                    "doctor" && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStatusChange(
                                                user._id
                                            )
                                        }
                                        disabled={
                                            updatingStatusId ===
                                            user._id
                                        }
                                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                            user.status ===
                                            "Active"
                                                ? "border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100"
                                                : "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                        }`}
                                    >
                                        <Check className="h-4 w-4" />

                                        {updatingStatusId ===
                                        user._id
                                            ? "Updating..."
                                            : user.status ===
                                              "Active"
                                            ? "Cancel Verification"
                                            : "Verify Doctor"}
                                    </button>
                                )}

                                {/* DELETE */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(
                                            user._id
                                        )
                                    }
                                    disabled={
                                        deletingId ===
                                        user._id
                                    }
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <TrashBin className="h-4 w-4" />

                                    {deletingId ===
                                    user._id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
                        <Person className="mx-auto mb-3 h-10 w-10 text-gray-300" />

                        <p className="font-semibold text-gray-500">
                            No users found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            There are no users
                            available.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersCard;