"use client";

import { useMemo, useState } from "react";

import {
    Calendar,
    Check,
    Clock,
    Stethoscope,
} from "@gravity-ui/icons";

import { Label } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";


const DoctorAppointment = ({ doctor }) => {

    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [loading, setLoading] = useState(false);


    // ==============================
    // Doctor Schedule
    // ==============================

    const workingDays =
        doctor?.schedule?.workingDays || [];

    const appointmentHours =
        doctor?.schedule?.appointmentHours || [];


    // ==============================
    // Generate Available Dates
    // ==============================

    const availableDates = useMemo(() => {

        const dates = [];

        const today = new Date();

        for (let i = 0; i < 30; i++) {

            const date = new Date(today);

            date.setDate(
                today.getDate() + i
            );

            const dayName =
                date.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long",
                    }
                );


            if (workingDays.includes(dayName)) {

                const year =
                    date.getFullYear();

                const month =
                    String(
                        date.getMonth() + 1
                    ).padStart(2, "0");

                const day =
                    String(
                        date.getDate()
                    ).padStart(2, "0");


                dates.push({
                    value: `${year}-${month}-${day}`,

                    label:
                        date.toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }
                        ),
                });
            }
        }

        return dates;

    }, [workingDays]);


    // ==============================
    // Current User
    // ==============================

    const {
        data: session,
    } = authClient.useSession();


    const userId =
        session?.user?.id;

    const patientEmail =
        session?.user?.email;


    // ==============================
    // Submit
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!userId) {
            toast.error(
                "Please login first."
            );
            return;
        }


        if (!appointmentDate) {
            toast.error(
                "Please select an appointment date."
            );
            return;
        }


        if (!appointmentTime) {
            toast.error(
                "Please select an appointment time."
            );
            return;
        }


        if (!symptoms.trim()) {
            toast.error(
                "Please describe your symptoms."
            );
            return;
        }


        try {

            setLoading(true);


            const formData =
                new FormData();


            // ==============================
            // Payment Information
            // ==============================

            formData.append(
                "consultationFee",
                doctor?.consultationFee
            );


            // ==============================
            // Doctor Information
            // ==============================

            formData.append(
                "doctorId",
                doctor?.doctorId
            );

            formData.append(
                "doctorName",
                doctor?.doctorName
            );


            // ==============================
            // Patient Information
            // ==============================

            formData.append(
                "patientId",
                userId
            );

            formData.append(
                "patientEmail",
                patientEmail || ""
            );


            // ==============================
            // Appointment Information
            // ==============================

            formData.append(
                "appointmentDate",
                appointmentDate
            );

            formData.append(
                "appointmentTime",
                appointmentTime
            );

            formData.append(
                "symptoms",
                symptoms.trim()
            );


            // ==============================
            // Create Stripe Checkout
            // ==============================

            const response =
                await fetch(
                    "/api/checkout_sessions",
                    {
                        method: "POST",
                        body: formData,
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data?.error ||
                    "Unable to create payment."
                );
            }


            // ==============================
            // Stripe Checkout
            // ==============================

            if (data?.url) {

                window.location.href =
                    data.url;

                return;
            }


            throw new Error(
                "Stripe checkout URL not found."
            );


        } catch (error) {

            console.error(
                "Payment Error:",
                error
            );

            toast.error(
                error.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <section className="mt-8 overflow-hidden rounded-3xl border border-[#dce7ec] bg-white shadow-sm">


            {/* Header */}

            <div className="border-b border-gray-100 bg-[#fbfdfe] p-6 sm:p-8">

                <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef5f8]">

                        <Stethoscope className="h-5 w-5 text-[#064b78]" />

                    </div>


                    <div>

                        <h2 className="text-xl font-bold text-[#12344d] sm:text-2xl">

                            Book an Appointment

                        </h2>


                        <p className="mt-1 text-sm leading-6 text-gray-500">

                            Select an available date and appointment
                            time according to the doctor's schedule.

                        </p>

                    </div>

                </div>

            </div>


            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8"
            >

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


                    {/* Date */}

                    <div className="flex flex-col gap-2">

                        <Label className="flex items-center gap-2 text-sm font-medium text-[#12344d]">

                            <Calendar className="h-4 w-4 text-[#064b78]" />

                            Available Date

                        </Label>


                        {availableDates.length > 0 ? (

                            <select
                                value={appointmentDate}
                                onChange={(e) => {

                                    setAppointmentDate(
                                        e.target.value
                                    );

                                    setAppointmentTime("");

                                }}
                                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none"
                            >

                                <option value="">
                                    Select available date
                                </option>


                                {availableDates.map(
                                    (date) => (

                                        <option
                                            key={date.value}
                                            value={date.value}
                                        >
                                            {date.label}
                                        </option>

                                    )
                                )}

                            </select>

                        ) : (

                            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">

                                This doctor has no available
                                working days configured.

                            </div>

                        )}

                    </div>


                    {/* Time */}

                    <div className="flex flex-col gap-2">

                        <Label className="flex items-center gap-2 text-sm font-medium text-[#12344d]">

                            <Clock className="h-4 w-4 text-[#064b78]" />

                            Available Hours

                        </Label>


                        <select
                            value={appointmentTime}
                            onChange={(e) =>
                                setAppointmentTime(
                                    e.target.value
                                )
                            }
                            disabled={!appointmentDate}
                            className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none disabled:bg-gray-100"
                        >

                            <option value="">

                                {!appointmentDate
                                    ? "Select a date first"
                                    : "Select appointment time"}

                            </option>


                            {appointmentHours.map(
                                (slot, index) => (

                                    <option
                                        key={index}
                                        value={`${slot.startTime} - ${slot.endTime}`}
                                    >

                                        {slot.startTime}
                                        {" - "}
                                        {slot.endTime}

                                    </option>

                                )
                            )}

                        </select>

                    </div>

                </div>


                {/* Symptoms */}

                <div className="mt-6 flex flex-col gap-2">

                    <Label className="text-sm font-medium text-[#12344d]">

                        Symptoms

                    </Label>


                    <textarea
                        value={symptoms}
                        onChange={(e) =>
                            setSymptoms(e.target.value)
                        }
                        rows={5}
                        placeholder="Describe your symptoms, health concerns, or reason for consultation..."
                        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none"
                    />

                </div>


                {/* Book Button */}

                <div className="mt-7 flex justify-end border-t border-gray-100 pt-6">

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#064b78] px-7 py-3 text-white hover:bg-[#053d61] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >

                        <Check className="h-4 w-4" />

                        {loading
                            ? "Processing..."
                            : "Book Appointment"}

                    </button>

                </div>

            </form>

        </section>
    );
};


export default DoctorAppointment;