
"use client";

import React, { useMemo } from "react";
import {
   ArrowUpRight, Calendar, Clock, Star, Stethoscope,
    CreditCard,
    CircleCheck,
} from "@gravity-ui/icons";

const Overviewcard = ({ AppoinmentsDetails = [] }) => {

    // Unique patients
    const totalPatients = useMemo(() => {
        const patients = AppoinmentsDetails.map(
            (appointment) => appointment.patientId
        );

        return new Set(patients).size;
    }, [AppoinmentsDetails]);

    // Total appointments
    const totalAppointments = AppoinmentsDetails.length;

    // Paid appointments
    const paidAppointments = AppoinmentsDetails.filter(
        (appointment) => appointment.paymentStatus === "paid"
    ).length;

    // Upcoming appointments
    const upcomingAppointments = useMemo(() => {
        const today = new Date();

        return [...AppoinmentsDetails]
            .filter((appointment) => {
                const appointmentDate = new Date(
                    `${appointment.appointmentDate}T00:00:00`
                );

                return appointmentDate >= today.setHours(0, 0, 0, 0);
            })
            .sort(
                (a, b) =>
                    new Date(`${a.appointmentDate}T00:00:00`) -
                    new Date(`${b.appointmentDate}T00:00:00`)
            )
            .slice(0, 5);
    }, [AppoinmentsDetails]);

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    };

    const stats = [
        {
            title: "Total Patients",
            value: totalPatients,
            description: "Unique patients",
            icon: Calendar,
        },
        {
            title: "Appointments",
            value: totalAppointments,
            description: "Total appointments",
            icon: Calendar,
        },
        {
            title: "Paid Appointments",
            value: paidAppointments,
            description: "Successfully paid",
            icon: CreditCard,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">

                {/* ================= HEADER ================= */}

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <div className="mb-2 flex items-center gap-2">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <Stethoscope className="h-4 w-4 text-primary" />
                            </div>

                            <span className="text-sm font-medium text-primary">
                                Doctor Dashboard
                            </span>

                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Overview
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Monitor your patients and appointments from here.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">

                        <Calendar className="h-4 w-4 text-slate-500" />

                        <span className="text-sm font-medium text-slate-700">
                            {new Date().toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>

                    </div>

                </div>


                {/* ================= STAT CARDS ================= */}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                            >

                                <div className="flex items-start justify-between">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>

                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </div>

                                </div>

                                <div className="mt-5">

                                    <p className="text-sm font-medium text-slate-500">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                                        {stat.value}
                                    </h2>

                                    <p className="mt-2 text-xs text-slate-400">
                                        {stat.description}
                                    </p>

                                </div>

                            </div>
                        );
                    })}

                </div>


                {/* ================= MAIN CONTENT ================= */}

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* ================= APPOINTMENTS ================= */}

                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">

                        <div className="flex items-center justify-between border-b border-slate-100 p-5">

                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Upcoming Appointments
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your latest patient appointments
                                </p>
                            </div>

                            <button className="text-sm font-semibold text-primary hover:underline">
                                View all
                            </button>

                        </div>


                        {/* Appointment List */}

                        {upcomingAppointments.length > 0 ? (

                            <div className="divide-y divide-slate-100">

                                {upcomingAppointments.map((appointment) => (

                                    <div
                                        key={appointment._id}
                                        className="p-5 transition-colors hover:bg-slate-50"
                                    >

                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                            {/* Patient */}

                                            <div className="flex items-center gap-4">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                    {getInitials(
                                                        appointment.patientName
                                                    )}
                                                </div>

                                                <div>

                                                    <h3 className="text-sm font-semibold text-slate-900">
                                                        {appointment.patientName}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {appointment.patientEmail}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Status */}

                                            <div className="flex items-center gap-2">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        appointment.appointmentStatus ===
                                                        "Approved"
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-amber-50 text-amber-600"
                                                    }`}
                                                >
                                                    {appointment.appointmentStatus}
                                                </span>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        appointment.paymentStatus ===
                                                        "paid"
                                                            ? "bg-blue-50 text-blue-600"
                                                            : "bg-red-50 text-red-600"
                                                    }`}
                                                >
                                                    {appointment.paymentStatus}
                                                </span>

                                            </div>

                                        </div>


                                        {/* Appointment Details */}

                                        <div className="mt-4 flex flex-wrap gap-3">

                                            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">

                                                <Calendar className="h-4 w-4 text-slate-400" />

                                                <span className="text-xs font-medium text-slate-600">
                                                    {formatDate(
                                                        appointment.appointmentDate
                                                    )}
                                                </span>

                                            </div>


                                            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">

                                                <Clock className="h-4 w-4 text-slate-400" />

                                                <span className="text-xs font-medium text-slate-600">
                                                    {appointment.appointmentTime}
                                                </span>

                                            </div>


                                            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">

                                                <Stethoscope className="h-4 w-4 text-slate-400" />

                                                <span className="text-xs font-medium text-slate-600">
                                                    {appointment.symptoms}
                                                </span>

                                            </div>


                                            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">

                                                <CreditCard className="h-4 w-4 text-slate-400" />

                                                <span className="text-xs font-medium text-slate-600">
                                                    ${appointment.consultationFee}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">

                                    <Calendar className="h-6 w-6 text-slate-400" />

                                </div>

                                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                                    No upcoming appointments
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    You don't have any upcoming appointments.
                                </p>

                            </div>

                        )}

                    </div>


                    {/* ================= REVIEWS ================= */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Patient Reviews
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your overall rating
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">

                                <Star className="h-5 w-5 text-amber-500" />

                            </div>

                        </div>


                        {/* Rating */}

                        <div className="mt-7 flex items-center gap-4">

                            <span className="text-4xl font-bold text-slate-900">
                                4.8
                            </span>

                            <div>

                                <div className="flex gap-0.5 text-amber-400">

                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className="h-4 w-4 fill-current"
                                        />
                                    ))}

                                </div>

                                <p className="mt-1 text-xs text-slate-400">
                                    Excellent rating
                                </p>

                            </div>

                        </div>


                        {/* Review */}

                        <div className="mt-7 rounded-xl bg-slate-50 p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                    P
                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-slate-900">
                                        Patient Feedback
                                    </p>

                                    <div className="mt-1 flex gap-0.5 text-amber-400">

                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className="h-3 w-3 fill-current"
                                            />
                                        ))}

                                    </div>

                                </div>

                            </div>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Patients appreciate your professional
                                consultation and caring approach.
                            </p>

                        </div>


                        <button className="mt-5 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                            View All Reviews
                        </button>

                    </div>

                </div>


                {/* ================= BOTTOM SECTION ================= */}

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">


                    {/* Payment Summary */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-lg font-semibold text-slate-900">
                                    Payment Summary
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Appointment payment overview
                                </p>

                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">

                                <CreditCard className="h-5 w-5 text-primary" />

                            </div>

                        </div>


                        <div className="mt-6 grid grid-cols-2 gap-3">

                            <div className="rounded-xl bg-slate-50 p-4">

                                <p className="text-xs text-slate-400">
                                    Paid
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {paidAppointments}
                                </p>

                            </div>


                            <div className="rounded-xl bg-slate-50 p-4">

                                <p className="text-xs text-slate-400">
                                    Total
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {totalAppointments}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Quick Summary */}

                    <div className="rounded-2xl bg-primary p-6 text-white shadow-sm">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">

                            <CircleCheck className="h-5 w-5" />

                        </div>

                        <h2 className="mt-5 text-xl font-bold">
                            Practice Overview
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-white/75">
                            You currently have{" "}
                            <span className="font-semibold text-white">
                                {totalPatients}
                            </span>{" "}
                            unique patients and{" "}
                            <span className="font-semibold text-white">
                                {totalAppointments}
                            </span>{" "}
                            appointments in the system.
                        </p>


                        <div className="mt-6 flex items-center gap-8">

                            <div>

                                <p className="text-2xl font-bold">
                                    {totalPatients}
                                </p>

                                <p className="text-xs text-white/65">
                                    Patients
                                </p>

                            </div>


                            <div className="h-10 w-px bg-white/20" />


                            <div>

                                <p className="text-2xl font-bold">
                                    {totalAppointments}
                                </p>

                                <p className="text-xs text-white/65">
                                    Appointments
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Overviewcard;

