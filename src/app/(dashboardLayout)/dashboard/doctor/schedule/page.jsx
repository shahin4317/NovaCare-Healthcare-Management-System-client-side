"use client";

import { useEffect, useState } from "react";

import {
    Calendar,
    Check,
    Clock,
    Plus,
    TrashBin,
} from "@gravity-ui/icons";

import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
} from "@heroui/react";

import { addSchedule } from "@/lib/api/doctors/action";
import { scheduleDetails } from "@/lib/api/doctors/data";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import EditSchedule from "@/components/EditSchedule";
import DeleteSchedule from "@/components/DeleteSchedule";

const DoctorScheduleForm = () => {
    const { data: session } = authClient.useSession();

    const email = session?.user?.email;

    // ==========================================
    // Working Days
    // ==========================================

    const days = [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
    ];

    // ==========================================
    // States
    // ==========================================

    const [selectedDays, setSelectedDays] = useState([]);

    const [schedule, setSchedule] = useState(null);

    const [loading, setLoading] = useState(true);

    // ==========================================
    // Appointment Slots
    // ==========================================

    const [appointmentSlots, setAppointmentSlots] = useState([
        {
            startTime: "",
            endTime: "",
        },
    ]);

    // ==========================================
    // Errors
    // ==========================================

    const [dayError, setDayError] = useState("");

    // ==========================================
    // Get Existing Schedule
    // ==========================================

    useEffect(() => {
        const getSchedule = async () => {
            if (!email) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const result = await scheduleDetails(email);

                setSchedule(result);
            } 

            
            finally {
                setLoading(false);
            }
        };

        getSchedule();
    }, [email]);

    // ==========================================
    // Select / Unselect Day
    // ==========================================

    const handleDaySelect = (day) => {
        setDayError("");

        setSelectedDays((prev) => {
            if (prev.includes(day)) {
                return prev.filter((item) => item !== day);
            }

            return [...prev, day];
        });
    };

    // ==========================================
    // Update Appointment Slot
    // ==========================================

    const handleSlotChange = (index, field, value) => {
        setAppointmentSlots((prev) =>
            prev.map((slot, i) =>
                i === index
                    ? {
                        ...slot,
                        [field]: value,
                    }
                    : slot
            )
        );
    };

    // ==========================================
    // Add New Slot
    // ==========================================

    const handleAddSlot = () => {
        setAppointmentSlots((prev) => [
            ...prev,
            {
                startTime: "",
                endTime: "",
            },
        ]);
    };

    // ==========================================
    // Remove Slot
    // ==========================================

    const handleRemoveSlot = (index) => {
        if (appointmentSlots.length === 1) {
            return;
        }

        setAppointmentSlots((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // ==========================================
    // Submit Schedule
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --------------------------------------
        // Validate Working Days
        // --------------------------------------

        if (selectedDays.length === 0) {
            setDayError(
                "Please select at least one working day."
            );

            return;
        }

        // --------------------------------------
        // Validate Slots
        // --------------------------------------

        const invalidSlot = appointmentSlots.some(
            (slot) =>
                !slot.startTime ||
                !slot.endTime
        );

        if (invalidSlot) {
            toast.error(
                "Please complete all appointment time slots."
            );

            return;
        }

        // --------------------------------------
        // Check Time
        // --------------------------------------

        const invalidTime = appointmentSlots.some(
            (slot) =>
                slot.startTime >= slot.endTime
        );

        if (invalidTime) {
            toast.error(
                "End time must be later than start time."
            );

            return;
        }

        // --------------------------------------
        // Schedule Data
        // --------------------------------------

        const scheduleData = {
            workingDays: selectedDays,
            appointmentHours: appointmentSlots,
        };

        try {
            const resData = await addSchedule(
                scheduleData,
                email
            );

            console.log(
                "Schedule added:",
                resData
            );

            if (resData) {
                toast.success("Schedule added successfully");

                // Update UI immediately
                setSchedule(resData);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(
                "Schedule submission failed:",
                error
            );

            toast.error(
                "Failed to save schedule"
            );
        }
    };

    // ==========================================
    // Loading State
    // ==========================================

    if (loading) {
        return (
            <div className="mx-auto w-full max-w-4xl">
                <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <p className="text-sm text-gray-500">
                        Loading schedule...
                    </p>
                </div>
            </div>
        );
    }

    // ==========================================
    // Main UI
    // ==========================================

    return (
        <div className="mx-auto w-full max-w-4xl">

            {/* =====================================================
                SCHEDULE EXISTS
            ====================================================== */}

            {schedule?.schedule ? (
                <div className="mt-10">

                    {/* Heading */}
                    <div className="mb-5">
                        <p className="mb-1 text-sm font-medium text-primary">
                            Doctor Availability
                        </p>

                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                            My Schedule
                        </h2>

                        <p className="mt-1 text-sm text-default-500">
                            Manage your working days and appointment hours.
                        </p>
                    </div>

                    {/* Schedule Card */}
                    <div className="rounded-2xl border border-default-200 bg-background p-5 shadow-sm">

                        {/* Card Header */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    Weekly Availability
                                </h3>

                                <p className="mt-1 text-sm text-default-500">
                                    Your current consultation schedule
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    className=""
                                >
                                    <EditSchedule scheduleData={schedule.schedule}
                                        doctorId={schedule._id}></EditSchedule>
                                </button>

                                <button
                                    type="button"
                                    className=""
                                >
                                    <DeleteSchedule scheduleData={schedule.schedule}   doctorId={schedule._id}></DeleteSchedule>
                                </button>

                            </div>

                        </div>

                        {/* Divider */}
                        <div className="my-5 h-px bg-default-200" />

                        {/* Working Days */}
                        <div>

                            <p className="mb-3 text-sm font-medium text-default-500">
                                Working Days
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {schedule.schedule.workingDays?.map(
                                    (day) => (
                                        <span
                                            key={day}
                                            className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                                        >
                                            {day}
                                        </span>
                                    )
                                )}

                            </div>

                        </div>

                        {/* Appointment Hours */}
                        <div className="mt-6">

                            <p className="mb-3 text-sm font-medium text-default-500">
                                Appointment Hours
                            </p>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                                {schedule.schedule.appointmentHours?.map(
                                    (slot, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-default-200 bg-default-50 p-4"
                                        >

                                            <p className="text-xs font-medium uppercase tracking-wide text-default-400">
                                                Time Slot {index + 1}
                                            </p>

                                            <p className="mt-2 text-base font-semibold text-foreground">
                                                {slot.startTime} —{" "}
                                                {slot.endTime}
                                            </p>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </div>

                </div>
            ) : (

                /* =====================================================
                   NO SCHEDULE → SHOW FORM
                ====================================================== */

                <div>

                    {/* Header */}
                    <div className="mb-6">

                        <h1 className="text-2xl font-semibold tracking-tight text-[#064b78] sm:text-3xl">
                            Manage Schedule
                        </h1>

                        <p className="mt-1.5 text-sm leading-6 text-gray-500">
                            Set your working days and configure
                            the hours when patients can book
                            appointments with you.
                        </p>

                    </div>

                    {/* Form Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

                        <Form
                            className="flex w-full flex-col gap-7"
                            onSubmit={handleSubmit}
                        >

                            {/* ==================================
                                WORKING WEEKDAYS
                            ================================== */}

                            <div className="flex flex-col gap-3">

                                <div>

                                    <div className="flex items-center gap-2">

                                        <Calendar className="h-4 w-4 text-[#064b78]" />

                                        <Label className="text-sm font-medium text-[#064b78]">
                                            Working Weekdays
                                        </Label>

                                    </div>

                                    <Description className="mt-1">
                                        Select the days when you are
                                        available for appointments.
                                    </Description>

                                </div>

                                {/* Days */}
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                                    {days.map((day) => {

                                        const selected =
                                            selectedDays.includes(day);

                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() =>
                                                    handleDaySelect(day)
                                                }
                                                className={`
                                                    flex
                                                    min-h-11
                                                    items-center
                                                    justify-between
                                                    rounded-lg
                                                    border
                                                    px-3
                                                    text-left
                                                    text-sm
                                                    font-medium
                                                    transition
                                                    ${selected
                                                        ? "border-[#064b78] bg-[#eef5f8] text-[#064b78]"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-[#064b78] hover:bg-[#f8fbfc]"
                                                    }
                                                `}
                                            >

                                                <span>
                                                    {day}
                                                </span>

                                                {selected && (
                                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#064b78] text-white">

                                                        <Check className="h-3 w-3" />

                                                    </span>
                                                )}

                                            </button>
                                        );
                                    })}

                                </div>

                                {/* Selected Days */}
                                {selectedDays.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">

                                        {selectedDays.map((day) => (
                                            <span
                                                key={day}
                                                className="rounded-full bg-[#eef5f8] px-2.5 py-1 text-xs font-medium text-[#064b78]"
                                            >
                                                {day}
                                            </span>
                                        ))}

                                    </div>
                                )}

                                {/* Error */}
                                {dayError && (
                                    <FieldError>
                                        {dayError}
                                    </FieldError>
                                )}

                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100" />

                            {/* ==================================
                                APPOINTMENT HOURS
                            ================================== */}

                            <div className="flex flex-col gap-4">

                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">

                                    <div>

                                        <div className="flex items-center gap-2">

                                            <Clock className="h-4 w-4 text-[#064b78]" />

                                            <Label className="text-sm font-medium text-[#064b78]">
                                                Configured Appointment Hours
                                            </Label>

                                        </div>

                                        <Description className="mt-1">
                                            Set the time ranges when
                                            patients can book appointments.
                                        </Description>

                                    </div>

                                    {/* Add Slot */}
                                    <Button
                                        type="button"
                                        onClick={handleAddSlot}
                                        className="shrink-0 border border-gray-200 bg-white text-[#064b78] hover:bg-[#eef5f8]"
                                    >

                                        <Plus className="h-4 w-4" />

                                        <span className="hidden sm:inline">
                                            Add Slot
                                        </span>

                                    </Button>

                                </div>

                                {/* Slots */}
                                <div className="flex flex-col gap-3">

                                    {appointmentSlots.map(
                                        (slot, index) => (
                                            <div
                                                key={index}
                                                className="rounded-xl border border-gray-200 bg-[#f8fbfc] p-4"
                                            >

                                                {/* Slot Header */}
                                                <div className="mb-4 flex items-center justify-between">

                                                    <div className="flex items-center gap-2">

                                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">

                                                            <Clock className="h-3.5 w-3.5 text-[#064b78]" />

                                                        </div>

                                                        <span className="text-sm font-medium text-gray-700">
                                                            Appointment Slot{" "}
                                                            {index + 1}
                                                        </span>

                                                    </div>

                                                    {/* Delete */}
                                                    {appointmentSlots.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoveSlot(
                                                                    index
                                                                )
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                                                            aria-label="Remove appointment slot"
                                                        >

                                                            <TrashBin className="h-4 w-4" />

                                                        </button>
                                                    )}

                                                </div>

                                                {/* Time Inputs */}
                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                                    {/* Start */}
                                                    <div className="flex flex-col gap-1.5">

                                                        <Label className="text-xs text-gray-500">
                                                            Start Time
                                                        </Label>

                                                        <Input
                                                            type="time"
                                                            value={
                                                                slot.startTime
                                                            }
                                                            onChange={(e) =>
                                                                handleSlotChange(
                                                                    index,
                                                                    "startTime",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full"
                                                        />

                                                    </div>

                                                    {/* End */}
                                                    <div className="flex flex-col gap-1.5">

                                                        <Label className="text-xs text-gray-500">
                                                            End Time
                                                        </Label>

                                                        <Input
                                                            type="time"
                                                            value={
                                                                slot.endTime
                                                            }
                                                            onChange={(e) =>
                                                                handleSlotChange(
                                                                    index,
                                                                    "endTime",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full"
                                                        />

                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>

                            </div>

                            {/* ==================================
                                EXAMPLE INFO
                            ================================== */}

                            <div className="rounded-xl border border-[#dceaf0] bg-[#f4f9fb] p-4">

                                <div className="flex gap-3">

                                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#064b78]" />

                                    <div>

                                        <p className="text-sm font-medium text-[#064b78]">
                                            Example
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            You can configure multiple
                                            sessions, for example:
                                            09:00 AM – 01:00 PM and
                                            05:00 PM – 09:00 PM.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* ==================================
                                SUBMIT
                            ================================== */}

                            <div className="flex justify-end border-t border-gray-100 pt-5">

                                <Button
                                    type="submit"
                                    className="w-full bg-[#064b78] px-7 py-2.5 text-white hover:bg-[#053d61] sm:w-auto"
                                >

                                    <Check className="h-4 w-4" />

                                    Save Schedule

                                </Button>

                            </div>

                        </Form>

                    </div>

                </div>
            )}

        </div>
    );
};

export default DoctorScheduleForm;

