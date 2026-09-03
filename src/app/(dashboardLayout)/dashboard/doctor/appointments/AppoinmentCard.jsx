"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { getUpdateStatus } from "@/lib/api/appoinments/action";


import {
    Calendar,
    Clock,
    Person,
    Stethoscope,
} from "@gravity-ui/icons";

import { Button } from "@heroui/react";
import Link from "next/link";

const AppoinmentCard = ({ AppoinmentsDetails }) => {
  

    const router = useRouter();

    const [loadingId, setLoadingId] = useState(null);


    // Approve Appointment
    const handelApproved = async (id) => {

        try {

            setLoadingId(id);

            const result = await getUpdateStatus(
                id,
                {
                    appointmentStatus: "Approved",
                }
            );

            console.log("Approved:", id, result);

            router.refresh();

        } catch (error) {

            console.error("Failed to approve appointment:", error);

        } finally {

            setLoadingId(null);

        }
    };


    // Cancel Appointment
    const handelCancel = async (id) => {

        try {

            setLoadingId(id);

            const result = await getUpdateStatus(
                id,
                {
                    appointmentStatus: "cancelled",
                }
            );

            console.log("Cancelled:", id, result);

            router.refresh();

        } catch (error) {

            console.error("Failed to cancel appointment:", error);

        } finally {

            setLoadingId(null);

        }
    };


    return (
        <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 md:px-8">

            {/* Header */}

            <div className="mb-8">

                <p className="mb-2 text-sm font-medium text-blue-600">
                    Doctor Dashboard
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    My Appointments
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Manage and view your patient appointments.
                </p>

            </div>


            {/* Appointment Count */}

            <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div>

                    <p className="text-sm text-slate-500">
                        Total Appointments
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                        {AppoinmentsDetails?.length || 0}
                    </h2>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">

                    <Calendar className="text-blue-600" />

                </div>

            </div>


            {/* Appointments */}

            {AppoinmentsDetails?.length > 0 ? (

                <div className="grid gap-5">

                    {AppoinmentsDetails.map((appointment) => (

                        <div
                            key={appointment._id}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                        >

                            {/* Top section */}

                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                {/* Patient */}

                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">

                                        <Person className="text-blue-600" />

                                    </div>

                                    <div>

                                        <h2 className="font-semibold text-slate-900">
                                            {appointment.patientName || "Patient"}
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            {appointment.patientEmail}
                                        </p>

                                    </div>

                                </div>


                                {/* Status Buttons */}

                                <div className="flex flex-wrap gap-3">


                                    {/* ========================= */}
                                    {/* PENDING */}
                                    {/* ========================= */}

                                    {appointment.appointmentStatus === "pending" && (
                                        <>

                                            <Button
                                                variant="outline"
                                                className="bg-amber-200"
                                            >
                                                Pending
                                            </Button>


                                            <Button
                                                variant="outline"
                                                className="bg-[#064b78] text-white"
                                                onPress={() =>
                                                    handelApproved(appointment._id)
                                                }
                                                isDisabled={
                                                    loadingId === appointment._id
                                                }
                                            >
                                                {loadingId === appointment._id
                                                    ? "Approving..."
                                                    : "Approved"}
                                            </Button>


                                            <Button
                                                variant="outline"
                                                className="bg-red-400 text-white"
                                                onPress={() =>
                                                    handelCancel(appointment._id)
                                                }
                                                isDisabled={
                                                    loadingId === appointment._id
                                                }
                                            >
                                                {loadingId === appointment._id
                                                    ? "Cancelling..."
                                                    : "Cancel"}
                                            </Button>

                                        </>
                                    )}


                                    {/* ========================= */}
                                    {/* APPROVED */}
                                    {/* ========================= */}

                                    {appointment.appointmentStatus === "Approved" && (
                                        <Link href={`/dashboard/doctor/prescription/${appointment._id}`}> <Button
                                            variant="outline"
                                            className="bg-[#064b78] text-white"
                                        >
                                            Mark Complited & Pescrive
                                        </Button></Link>



                                    )}


                                    {/* ========================= */}
                                    {/* CANCELLED */}
                                    {/* ========================= */}

                                    {appointment.appointmentStatus === "cancelled" && (
                                        <>

                                            <Button
                                                variant="outline"
                                                className="bg-amber-200"
                                            >
                                                Pending
                                            </Button>


                                            <Button
                                                variant="outline"
                                                className="bg-[#064b78] text-white"
                                                onPress={() =>
                                                    handelApproved(appointment._id)
                                                }
                                                isDisabled={
                                                    loadingId === appointment._id
                                                }
                                            >
                                                {loadingId === appointment._id
                                                    ? "Approving..."
                                                    : "Approved"}
                                            </Button>

                                        </>
                                    )}

                                </div>

                            </div>


                            {/* Appointment Information */}

                            <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">


                                {/* Date */}

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">

                                        <Calendar className="text-blue-600" />

                                    </div>

                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Date
                                        </p>

                                        <p className="text-sm font-medium text-slate-800">
                                            {appointment.appointmentDate}
                                        </p>

                                    </div>

                                </div>


                                {/* Time */}

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">

                                        <Clock className="text-purple-600" />

                                    </div>

                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Time
                                        </p>

                                        <p className="text-sm font-medium text-slate-800">
                                            {appointment.appointmentTime}
                                        </p>

                                    </div>

                                </div>


                                {/* Symptoms */}

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">

                                        <Stethoscope className="text-red-600" />

                                    </div>

                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Symptoms
                                        </p>

                                        <p className="text-sm font-medium text-slate-800">
                                            {appointment.symptoms || "Not provided"}
                                        </p>

                                    </div>

                                </div>


                                {/* Payment */}

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                                        $
                                    </div>

                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Payment
                                        </p>

                                        <p className="text-sm font-medium capitalize text-slate-800">
                                            {appointment.paymentStatus || "Pending"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                /* Empty State */

                <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">

                        <Calendar className="text-blue-600" />

                    </div>

                    <h2 className="mt-5 text-xl font-semibold text-slate-900">
                        No Appointments Yet
                    </h2>

                    <p className="mt-2 max-w-md text-sm text-slate-500">
                        You don't have any patient appointments yet.
                        New bookings will appear here.
                    </p>

                </div>

            )}

        </div>
    );
};

export default AppoinmentCard;