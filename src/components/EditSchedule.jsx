
"use client";

import { updateSchedule } from "@/lib/api/doctors/action";
import {
    Calendar,
    Check,
    Clock,
    Plus,
    Rocket,
    TrashBin,
} from "@gravity-ui/icons";

import {
    Button,
    Description,
    Input,
    Label,
    Modal,
} from "@heroui/react";

import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

const EditSchedule = ({ scheduleData, doctorId }) => {
    const router = useRouter()
    const days = [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
    ];

    const variants = ["blur"];

    // ==========================================
    // Existing Schedule Data
    // ==========================================

    const [selectedDays, setSelectedDays] = useState(
        scheduleData?.workingDays || []
    );

    const [appointmentSlots, setAppointmentSlots] = useState(
        scheduleData?.appointmentHours?.length
            ? scheduleData.appointmentHours
            : [
                {
                    startTime: "",
                    endTime: "",
                },
            ]
    );

    // ==========================================
    // Select / Unselect Day
    // ==========================================

    const handleDaySelect = (day) => {
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
    // Submit
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedSchedule = {
            workingDays: selectedDays,
            appointmentHours: appointmentSlots,
        };

        console.log("Updated Schedule:", updatedSchedule);
        const result = await updateSchedule(updatedSchedule, doctorId)
        console.log(result);
        if (result?.success) {
            toast.success('Schedule Update Complete')
            router.push('/dashboard/doctor/schedule')
            window.location.href = "/dashboard/doctor/schedule";
            router.refresh();
        }



    };

    return (
        <div className="flex flex-wrap gap-4">

            {variants.map((variant) => (
                <Modal key={variant}>

                    {/* ===============================
                        EDIT BUTTON
                    =============================== */}

                    <Button variant="secondary">
                        Edit
                    </Button>

                    <Modal.Backdrop variant={variant}>

                        <Modal.Container>

                            <Modal.Dialog className="sm:max-w-[360px]">

                                <Modal.CloseTrigger />

                                {/* ===============================
                                    HEADER
                                =============================== */}

                                <Modal.Header>

                                    <Modal.Icon className="bg-default text-foreground">
                                        <Rocket className="size-5" />
                                    </Modal.Icon>

                                    <Modal.Heading>
                                        Edit Schedule
                                    </Modal.Heading>

                                </Modal.Header>

                                {/* ===============================
                                    BODY
                                =============================== */}

                                <Modal.Body>

                                    <form
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

                                            {/* ==============================
                                                DAYS
                                            ============================== */}

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

                                            {/* ==============================
                                                SELECTED DAYS
                                            ============================== */}

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

                                            {/* ==============================
                                                SLOTS
                                            ============================== */}

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

                                                Update Schedule

                                            </Button>

                                        </div>

                                    </form>

                                </Modal.Body>

                                {/* ===============================
                                    FOOTER
                                =============================== */}

                                <Modal.Footer>

                                    {/* <Button
                                        className="w-full"
                                        slot="close"
                                    >
                                        Continue
                                    </Button> */}

                                </Modal.Footer>

                            </Modal.Dialog>

                        </Modal.Container>

                    </Modal.Backdrop>

                </Modal>
            ))}

        </div>
    );
};

export default EditSchedule;

