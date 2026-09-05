
"use client";

import React from "react";
import {
    Calendar,
    CreditCard,
    PersonFill,
    Receipt,
    Stethoscope,
  
    Copy,
    CheckShapeFill,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";

export const PaymentCards = ({ payment = [] }) => {
    console.log(payment, "from card");

    const copyTransaction = (transactionId) => {
        navigator.clipboard.writeText(transactionId);
        toast.success("Transaction ID copied!");
    };

    return (
        <div className="w-full">

            {/* ================= HEADER ================= */}
            <div className="mb-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <p className="text-sm font-semibold text-blue-600">
                            Payment History
                        </p>

                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            View Payment Records
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            View all your payment transactions and appointment
                            payment details.
                        </p>
                    </div>

                    {/* Total Records */}
                    <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Receipt className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">
                                Total Records
                            </p>

                            <p className="text-lg font-bold text-slate-900">
                                {payment.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* ================= TABLE ================= */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                {/* Desktop Table Header */}
                <div className="hidden grid-cols-[1.4fr_1fr_1.4fr_1.4fr_1fr_0.8fr] items-center gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 lg:grid">

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Payment
                    </p>

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Amount
                    </p>

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Transaction
                    </p>

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Appointment
                    </p>

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Date
                    </p>

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Status
                    </p>
                </div>


                {/* ================= PAYMENT ROWS ================= */}
                <div className="divide-y divide-slate-100">

                    {payment.length > 0 ? (
                        payment.map((item) => {

                            const date = new Date(item.paymentDate);

                            const formattedDate = date.toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }
                            );

                            const formattedTime = date.toLocaleTimeString(
                                "en-US",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            );

                            return (
                                <div
                                    key={item._id}
                                    className="group transition hover:bg-slate-50"
                                >

                                    {/* ================= DESKTOP ================= */}
                                    <div className="hidden grid-cols-[1.4fr_1fr_1.4fr_1.4fr_1fr_0.8fr] items-center gap-4 px-6 py-5 lg:grid">

                                        {/* Payment */}
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                <CreditCard className="h-5 w-5" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-slate-800">
                                                    Payment
                                                </p>

                                                <p
                                                    title={item._id}
                                                    className="mt-1 truncate text-xs text-slate-400"
                                                >
                                                    ID: {item._id}
                                                </p>
                                            </div>

                                        </div>


                                        {/* Amount */}
                                        <div>
                                            <p className="text-base font-extrabold text-slate-900">
                                                ৳{item.amount.toLocaleString()}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                BDT
                                            </p>
                                        </div>


                                        {/* Transaction */}
                                        <div className="min-w-0">

                                            <p className="text-xs font-medium text-slate-400">
                                                Transaction ID
                                            </p>

                                            <div className="mt-1 flex items-center gap-2">

                                                <p
                                                    title={item.transactionId}
                                                    className="max-w-[150px] truncate text-sm font-semibold text-slate-700"
                                                >
                                                    {item.transactionId}
                                                </p>

                                                <button
                                                    onClick={() =>
                                                        copyTransaction(
                                                            item.transactionId
                                                        )
                                                    }
                                                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </button>

                                            </div>

                                        </div>


                                        {/* Appointment */}
                                        <div className="min-w-0">

                                            <div className="flex items-center gap-2">

                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                                    <Stethoscope className="h-4 w-4" />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-xs text-slate-400">
                                                        Appointment
                                                    </p>

                                                    <p
                                                        title={item.appointmentId}
                                                        className="truncate text-sm font-semibold text-slate-700"
                                                    >
                                                        {item.appointmentId}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>


                                        {/* Date */}
                                        <div>

                                            <div className="flex items-center gap-2">

                                                <Calendar className="h-4 w-4 text-blue-500" />

                                                <div>
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {formattedDate}
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        {formattedTime}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>


                                        {/* Status */}
                                        <div>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                                                <CheckShapeFill className="h-3.5 w-3.5" />
                                                Paid
                                            </span>
                                        </div>

                                    </div>


                                    {/* ================= MOBILE / TABLET ================= */}
                                    <div className="p-5 lg:hidden">

                                        {/* Top */}
                                        <div className="flex items-start justify-between gap-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                    <CreditCard className="h-6 w-6" />
                                                </div>

                                                <div>
                                                    <p className="font-bold text-slate-900">
                                                        Payment Record
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        #{item._id.slice(-8)}
                                                    </p>
                                                </div>

                                            </div>

                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                                                <CheckShapeFill className="h-3.5 w-3.5" />
                                                Paid
                                            </span>

                                        </div>


                                        {/* Amount */}
                                        <div className="mt-5 rounded-2xl bg-slate-50 p-4">

                                            <p className="text-xs font-medium text-slate-400">
                                                Total Amount
                                            </p>

                                            <p className="mt-1 text-2xl font-extrabold text-slate-900">
                                                ৳{item.amount.toLocaleString()}
                                                <span className="ml-2 text-xs font-medium text-slate-400">
                                                    BDT
                                                </span>
                                            </p>

                                        </div>


                                        {/* Details */}
                                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                            {/* Transaction */}
                                            <div className="rounded-2xl border border-slate-100 p-4">

                                                <div className="flex items-center gap-2">
                                                    <Receipt className="h-4 w-4 text-violet-500" />

                                                    <p className="text-xs font-medium text-slate-400">
                                                        Transaction ID
                                                    </p>
                                                </div>

                                                <p
                                                    title={item.transactionId}
                                                    className="mt-2 truncate text-sm font-semibold text-slate-700"
                                                >
                                                    {item.transactionId}
                                                </p>

                                                <button
                                                    onClick={() =>
                                                        copyTransaction(
                                                            item.transactionId
                                                        )
                                                    }
                                                    className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-600"
                                                >
                                                    <Copy className="h-3.5 w-3.5" />
                                                    Copy ID
                                                </button>

                                            </div>


                                            {/* Date */}
                                            <div className="rounded-2xl border border-slate-100 p-4">

                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-blue-500" />

                                                    <p className="text-xs font-medium text-slate-400">
                                                        Payment Date
                                                    </p>
                                                </div>

                                                <p className="mt-2 text-sm font-semibold text-slate-700">
                                                    {formattedDate}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    {formattedTime}
                                                </p>

                                            </div>


                                            {/* Appointment */}
                                            <div className="rounded-2xl border border-slate-100 p-4">

                                                <div className="flex items-center gap-2">
                                                    <Stethoscope className="h-4 w-4 text-emerald-500" />

                                                    <p className="text-xs font-medium text-slate-400">
                                                        Appointment ID
                                                    </p>
                                                </div>

                                                <p
                                                    title={item.appointmentId}
                                                    className="mt-2 truncate text-sm font-semibold text-slate-700"
                                                >
                                                    {item.appointmentId}
                                                </p>

                                            </div>


                                            {/* Patient */}
                                            <div className="rounded-2xl border border-slate-100 p-4">

                                                <div className="flex items-center gap-2">
                                                    <PersonFill className="h-4 w-4 text-orange-500" />

                                                    <p className="text-xs font-medium text-slate-400">
                                                        Patient ID
                                                    </p>
                                                </div>

                                                <p
                                                    title={item.patientId}
                                                    className="mt-2 truncate text-sm font-semibold text-slate-700"
                                                >
                                                    {item.patientId}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            );
                        })
                    ) : (

                        /* ================= EMPTY ================= */
                        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <Receipt className="h-8 w-8" />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-slate-800">
                                No Payment Records
                            </h3>

                            <p className="mt-1 max-w-sm text-sm text-slate-400">
                                You don't have any payment records yet.
                            </p>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

