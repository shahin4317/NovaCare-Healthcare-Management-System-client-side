"use client";

import React from "react";
import {
    Calendar,
    Clock,
    Stethoscope,
    CreditCard,
    CircleCheck,
    Eye,
    Pencil,
    CircleXmark,
} from "@gravity-ui/icons";

const AppointmentsCard = ({ appointment}) => {
    
    const data = appointment?._id
    console.log("appointment data:", data);

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (!appointment.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-sm text-slate-500">
                    No appointments found.
                </p>
            </div>
        );
    }



    return (
        <div className="space-y-5">
            {appointment.map((item) => (
                <div
                    key={item._id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                    {/* Header */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                <Stethoscope className="h-6 w-6 text-primary" />
                            </div>

                            <div>
                                <p className="text-xs font-medium text-slate-400">
                                    Appointment with
                                </p>

                                <h2 className="mt-1 text-base font-bold text-slate-900">
                                    {item.doctorName}
                                </h2>
                            </div>

                        </div>

                        {/* Appointment Status */}

                        <div
                            className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                                item.appointmentStatus === "Approved"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-amber-50 text-amber-600"
                            }`}
                        >
                            <CircleCheck className="h-3.5 w-3.5" />

                            {item.appointmentStatus}
                        </div>

                    </div>


                    {/* Appointment Information */}

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Date */}

                        <div className="rounded-xl bg-slate-50 p-4">

                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />

                                <span className="text-xs font-medium text-slate-400">
                                    Date
                                </span>
                            </div>

                            <p className="mt-2 text-sm font-semibold text-slate-800">
                                {formatDate(item.appointmentDate)}
                            </p>

                        </div>


                        {/* Time */}

                        <div className="rounded-xl bg-slate-50 p-4">

                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />

                                <span className="text-xs font-medium text-slate-400">
                                    Time
                                </span>
                            </div>

                            <p className="mt-2 text-sm font-semibold text-slate-800">
                                {item.appointmentTime}
                            </p>

                        </div>


                        {/* Symptoms */}

                        <div className="rounded-xl bg-slate-50 p-4">

                            <div className="flex items-center gap-2">
                                <Stethoscope className="h-4 w-4 text-primary" />

                                <span className="text-xs font-medium text-slate-400">
                                    Reason
                                </span>
                            </div>

                            <p className="mt-2 truncate text-sm font-semibold text-slate-800">
                                {item.symptoms}
                            </p>

                        </div>


                        {/* Fee */}

                        <div className="rounded-xl bg-slate-50 p-4">

                            <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-primary" />

                                <span className="text-xs font-medium text-slate-400">
                                    Consultation Fee
                                </span>
                            </div>

                            <p className="mt-2 text-sm font-semibold text-slate-800">
                                ৳{item.consultationFee}
                            </p>

                        </div>

                    </div>


                    {/* Payment */}

                    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-xs text-slate-400">
                                Payment Status
                            </p>

                            <div className="mt-1 flex flex-wrap items-center gap-2">

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                        item.paymentStatus === "paid"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-red-50 text-red-600"
                                    }`}
                                >
                                    {item.paymentStatus}
                                </span>

                                <span className="text-xs text-slate-400">
                                    Transaction ID: {item.transactionId}
                                </span>

                            </div>

                        </div>


                        <div className="text-left sm:text-right">

                            <p className="text-xs text-slate-400">
                                Paid Amount
                            </p>

                            <p className="mt-1 text-lg font-bold text-slate-900">
                                ৳{item.paymentAmount / 100}
                            </p>

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">

                        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90">
                            <Eye className="h-4 w-4" />
                            View Appointment
                        </button>


                        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                            <Pencil className="h-4 w-4" />
                            Reschedule Appointment
                        </button>


                        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100">
                            <CircleXmark className="h-4 w-4" />
                            Cancel Appointment
                        </button>

                    </div>

                </div>
            ))}
        </div>
    );
};

export default AppointmentsCard;