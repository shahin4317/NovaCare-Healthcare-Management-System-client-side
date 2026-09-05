
"use client";

import React from "react";
import {
    Calendar,
    Clock,
    CreditCard,
    PersonFill,
    Stethoscope,
    CircleCheck,
    CircleXmark,
    CircleExclamation,
} from "@gravity-ui/icons";

const AppoinmentsCards = ({ appointments = [] }) => {
    console.log(appointments, "appointments");

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "Approved":
                return {
                    bg: "bg-blue-50",
                    text: "text-blue-600",
                    icon: CircleCheck,
                    label: "Approved",
                };

            case "completed":
                return {
                    bg: "bg-emerald-50",
                    text: "text-emerald-600",
                    icon: CircleCheck,
                    label: "Completed",
                };

            case "Cancelled":
            case "Cancelled":
                return {
                    bg: "bg-red-50",
                    text: "text-red-600",
                    icon: CircleXmark,
                    label: "Cancelled",
                };

            default:
                return {
                    bg: "bg-amber-50",
                    text: "text-amber-600",
                    icon: CircleExclamation,
                    label: "pending",
                };
        }
    };

    return (
        <section className="w-full">

            {/* ================= HEADER ================= */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        Appointment Management
                    </p>

                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        View All Appointments
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                        Monitor your appointments, consultation details,
                        payment status and appointment progress.
                    </p>
                </div>

                {/* Appointment Count */}
                <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Calendar className="h-5 w-5" />
                    </div>

                    <div>
                        <p className="text-xs font-medium text-slate-400">
                            Total Appointments
                        </p>

                        <p className="text-lg font-bold text-slate-900">
                            {appointments.length}
                        </p>
                    </div>

                </div>
            </div>


            {/* ================= APPOINTMENTS ================= */}
            {appointments.length > 0 ? (
                <div className="space-y-4">

                    {appointments.map((appointment) => {

                        const status = getStatusStyle(
                            appointment.appointmentStatus
                        );

                        const StatusIcon = status.icon;

                        return (
                            <div
                                key={appointment._id}
                                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                            >

                                {/* ================= TOP ================= */}
                                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

                                    {/* Doctor */}
                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                            <Stethoscope className="h-7 w-7" />
                                        </div>

                                        <div className="min-w-0">

                                            <p className="text-xs font-medium text-slate-400">
                                                Appointment with
                                            </p>

                                            <h3 className="mt-1 truncate text-lg font-bold text-slate-900">
                                                {appointment.doctorName}
                                            </h3>

                                            <p
                                                title={appointment._id}
                                                className="mt-1 truncate text-xs text-slate-400"
                                            >
                                                Appointment ID: {appointment._id}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Status */}
                                    <div
                                        className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${status.bg} ${status.text}`}
                                    >
                                        <StatusIcon className="h-4 w-4" />
                                        {status.label}
                                    </div>

                                </div>


                                {/* ================= MAIN INFO ================= */}
                                <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 md:grid-cols-2 xl:grid-cols-4">

                                    {/* Date */}
                                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                <Calendar className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium text-slate-400">
                                                    Appointment Date
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-slate-800">
                                                    {appointment.appointmentDate}
                                                </p>
                                            </div>

                                        </div>

                                    </div>


                                    {/* Time */}
                                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                                <Clock className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium text-slate-400">
                                                    Appointment Time
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-slate-800">
                                                    {appointment.appointmentTime}
                                                </p>
                                            </div>

                                        </div>

                                    </div>


                                    {/* Patient */}
                                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                                <PersonFill className="h-5 w-5" />
                                            </div>

                                            <div className="min-w-0">

                                                <p className="text-xs font-medium text-slate-400">
                                                    Patient
                                                </p>

                                                <p className="mt-1 truncate text-sm font-bold text-slate-800">
                                                    {appointment.patientName}
                                                </p>

                                                <p className="truncate text-xs text-slate-400">
                                                    {appointment.patientEmail}
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Payment */}
                                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                                <CreditCard className="h-5 w-5" />
                                            </div>

                                            <div>

                                                <p className="text-xs font-medium text-slate-400">
                                                    Consultation Fee
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-slate-800">
                                                    ৳{Number(
                                                        appointment.consultationFee || 0
                                                    ).toLocaleString()}
                                                </p>

                                                <p
                                                    className={`text-xs font-semibold ${
                                                        appointment.paymentStatus === "paid"
                                                            ? "text-emerald-500"
                                                            : "text-amber-500"
                                                    }`}
                                                >
                                                    {appointment.paymentStatus === "paid"
                                                        ? "Payment Completed"
                                                        : "Payment Pending"}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* ================= SYMPTOMS ================= */}
                                <div className="px-5 pb-5 sm:px-6 sm:pb-6">

                                    <div className="rounded-2xl border border-slate-100 bg-white p-4">

                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Patient Symptoms
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {appointment.symptoms || "No symptoms provided."}
                                        </p>

                                    </div>

                                </div>


                                {/* ================= FOOTER ================= */}
                                <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">

                                    <div className="flex flex-wrap gap-x-6 gap-y-2">

                                        <div>
                                            <p className="text-[11px] font-medium text-slate-400">
                                                Booking Date
                                            </p>

                                            <p className="mt-1 text-xs font-semibold text-slate-600">
                                                {new Date(
                                                    appointment.bookingDate
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[11px] font-medium text-slate-400">
                                                Payment
                                            </p>

                                            <p className="mt-1 text-xs font-semibold text-slate-600">
                                                {appointment.paymentStatus || "Unpaid"}
                                            </p>
                                        </div>

                                    </div>


                                    {/* Transaction */}
                                    {appointment.transactionId && (
                                        <div className="max-w-full">

                                            <p className="text-[11px] font-medium text-slate-400">
                                                Transaction ID
                                            </p>

                                            <p
                                                title={appointment.transactionId}
                                                className="mt-1 max-w-[260px] truncate text-xs font-semibold text-slate-600"
                                            >
                                                {appointment.transactionId}
                                            </p>

                                        </div>
                                    )}

                                </div>

                            </div>
                        );
                    })}

                </div>
            ) : (

                /* ================= EMPTY STATE ================= */
                <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 text-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                        <Calendar className="h-8 w-8" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                        No Appointments Found
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                        There are no appointments available at the moment.
                        Your appointment records will appear here once
                        they are created.
                    </p>

                </div>
            )}

        </section>
    );
};

export default AppoinmentsCards;

