"use client";

import { useMemo, useState } from "react";
import {
    Calendar,
    Check,
    Clock,
    Stethoscope,
} from "@gravity-ui/icons";

import { Button, Input, Label } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { addAppointments } from "@/lib/api/appoinments/action";



const DoctorAppointment = ({ doctor }) => {
    console.log(doctor);


    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [symptoms, setSymptoms] = useState("");

    const workingDays = doctor?.schedule?.workingDays || [];


    const appointmentHours =
        doctor?.schedule?.appointmentHours || [];


    // ==========================================
    // Generate Available Dates
    // ==========================================

    const availableDates = useMemo(() => {

        const dates = [];

        const today = new Date();

        // আগামী 30 দিনের date check
        for (let i = 0; i < 30; i++) {

            const date = new Date(today);

            date.setDate(today.getDate() + i);

            const dayName = date.toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                }
            );

            if (workingDays.includes(dayName)) {

                const year = date.getFullYear();

                const month = String(
                    date.getMonth() + 1
                ).padStart(2, "0");

                const day = String(
                    date.getDate()
                ).padStart(2, "0");

                dates.push({
                    value: `${year}-${month}-${day}`,
                    label: date.toLocaleDateString(
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


    const {
        data: session,

    } = authClient.useSession()
    console.log(session, 'user');
    const userId = session?.user?.id
    const users= session?.user?.email
    console.log(users);



    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!appointmentDate) {
            toast.error("Please select an appointment date.");
            return;
        }

        if (!appointmentTime) {
            toast.error("Please select an appointment time.");
            return;
        }

        if (!symptoms.trim()) {
            toast.error("Please describe your symptoms.");
            return;
        }


        // ======================================
        // Appointment Object
        // ======================================

        const appointmentData = {

            patientId: userId,
            patientEmail: users,

            doctorId: doctor.doctorsId,


            appointmentDate,

            appointmentTime,

            appointmentStatus: "pending",

            symptoms: symptoms.trim(),
            paymentStatus: null

        };
        const resData = await addAppointments(appointmentData)
        if (resData) {
            toast.success(
                "Appointment data prepared successfully!"
            );
        }
        if(!resData){
            toast.error('Something went Worng')
        }


    };


    return (
        <section className="mt-8 overflow-hidden rounded-3xl border border-[#dce7ec] bg-white shadow-sm">

            {/* =====================================
                HEADER
            ====================================== */}

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


            {/* =====================================
                FORM
            ====================================== */}

            <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8"
            >

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


                    {/* =================================
                        AVAILABLE DATE
                    ================================= */}

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

                                    // date change হলে time reset
                                    setAppointmentTime("");
                                }}
                                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-[#064b78] focus:ring-2 focus:ring-[#064b78]/10"
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

                        <p className="text-xs text-gray-400">
                            Only the doctor's working days are shown.
                        </p>

                    </div>


                    {/* =================================
                        AVAILABLE TIME
                    ================================= */}

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
                            className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-[#064b78] focus:ring-2 focus:ring-[#064b78]/10"
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
                                        {slot.startTime} -{" "}
                                        {slot.endTime}
                                    </option>
                                )
                            )}

                        </select>

                        <p className="text-xs text-gray-400">
                            Based on the doctor's configured
                            appointment hours.
                        </p>

                    </div>

                </div>


                {/* =================================
                    SYMPTOMS
                ================================= */}

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
                        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#064b78] focus:ring-2 focus:ring-[#064b78]/10"
                    />

                    <p className="text-xs text-gray-400">
                        Please provide a brief description of your
                        symptoms so the doctor can understand your
                        concern.
                    </p>

                </div>


                {/* =================================
                    BOOK BUTTON
                ================================= */}

                <div className="mt-7 flex justify-end border-t border-gray-100 pt-6">

                    <Button
                        type="submit"
                        className="w-full bg-[#064b78] px-7 py-3 text-white hover:bg-[#053d61] sm:w-auto"
                    >

                        <Check className="h-4 w-4" />

                        Book Appointment

                    </Button>

                </div>

            </form>

        </section>
    );
};

export default DoctorAppointment;  