
"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import {
    Briefcase,
    Calendar,
    Check,
    CircleDollar,
    Clock,
    Factory,
    GraduationCap,
    Person,
    Picture,
    Stethoscope,
    ArrowChevronDown,
} from "@gravity-ui/icons";

import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

import { useSession } from "@/lib/auth-client";
import { addDoctors, upDateDoctors } from "@/lib/api/doctors/action";
import toast from "react-hot-toast";
import { doctorProfile } from "@/lib/api/doctors/data";

const DoctorProfileForm = () => {
    // ==========================================
    // States
    // ==========================================

    const [specializationOpen, setSpecializationOpen] =
        useState(false);

    const [daysOpen, setDaysOpen] = useState(false);

    const [selectedDays, setSelectedDays] = useState([]);

    const [photoFile, setPhotoFile] = useState(null);

    // Existing doctor data
    const [doctor, setDoctor] = useState(null);

    // ==========================================
    // Refs
    // ==========================================

    const specializationRef = useRef(null);
    const daysRef = useRef(null);

    // ==========================================
    // React Hook Form
    // ==========================================

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            doctorName: "",
            specialization: "",
            qualifications: "",
            experience: "",
            consultationFee: "",
            hospitalName: "",
            profileImage: "",
            availableDays: [],
            availableSlots: [
                {
                    startTime: "",
                    endTime: "",
                },
            ],
        },
    });

    // ==========================================
    // Session
    // ==========================================

    const { data: session } = useSession();

    const userEmail = session?.user?.email;

    // ==========================================
    // Get Existing Doctor Profile
    // ==========================================

    useEffect(() => {
        if (!userEmail) return;

        const getDoctorData = async () => {
            try {
                const datas = await doctorProfile(userEmail);

                console.log("Doctor profile:", datas);

                if (datas) {
                    // Store doctor data
                    setDoctor(datas);

                    // Populate React Hook Form
                    reset({
                        doctorName: datas.doctorName || "",

                        specialization:
                            datas.specialization || "",

                        qualifications:
                            datas.qualifications || "",

                        experience:
                            datas.experience || "",

                        consultationFee:
                            datas.consultationFee || "",

                        hospitalName:
                            datas.hospitalName || "",

                        profileImage:
                            datas.profileImage || "",

                        availableDays:
                            datas.availableDays || [],

                        availableSlots:
                            datas.availableSlots || [
                                {
                                    startTime: "",
                                    endTime: "",
                                },
                            ],
                    });

                    // Populate selected days UI
                    setSelectedDays(
                        datas.availableDays || []
                    );
                } else {
                    // No doctor profile found
                    setDoctor(null);

                    setSelectedDays([]);
                }
            } catch (error) {
                console.error(
                    "Failed to load doctor profile:",
                    error
                );
            }
        };

        getDoctorData();
    }, [userEmail, reset]);

    // ==========================================
    // Watch Specialization
    // ==========================================

    const specializationValue =
        watch("specialization");

    // ==========================================
    // Specialization Options
    // ==========================================

    const specializationOptions = [
        "Cardiology",
        "Neurology",
        "Dermatology",
        "Orthopedics",
        "Pediatrics",
        "Gynecology",
        "Psychiatry",
        "Ophthalmology",
        "Dentistry",
        "ENT",
        "General Medicine",
        "General Surgery",
    ];

    // ==========================================
    // Available Days
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
    // Outside Click
    // ==========================================

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                specializationRef.current &&
                !specializationRef.current.contains(
                    event.target
                )
            ) {
                setSpecializationOpen(false);
            }

            if (
                daysRef.current &&
                !daysRef.current.contains(event.target)
            ) {
                setDaysOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // ==========================================
    // Select Specialization
    // ==========================================

    const handleSpecializationSelect = (
        specialization
    ) => {
        setValue(
            "specialization",
            specialization,
            {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            }
        );

        setSpecializationOpen(false);
    };

    // ==========================================
    // Select Available Day
    // ==========================================

    const handleDaySelect = (day) => {
        let updatedDays;

        if (selectedDays.includes(day)) {
            updatedDays = selectedDays.filter(
                (item) => item !== day
            );
        } else {
            updatedDays = [
                ...selectedDays,
                day,
            ];
        }

        setSelectedDays(updatedDays);

        setValue(
            "availableDays",
            updatedDays,
            {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            }
        );
    };

    // ==========================================
    // ImgBB Image Upload
    // ==========================================

    const uploadToImgBB = async (file) => {
        if (!file) {
            return "";
        }

        const apiKey =
            process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        if (!apiKey) {
            throw new Error(
                "ImgBB API key is missing. Please add NEXT_PUBLIC_IMGBB_API_KEY to .env.local"
            );
        }

        const formData = new FormData();

        formData.append("image", file);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        console.log(
            "ImgBB Response:",
            data
        );

        if (!response.ok) {
            throw new Error(
                data?.error?.message ||
                "ImgBB upload request failed"
            );
        }

        if (!data.success) {
            throw new Error(
                data?.error?.message ||
                "Image upload failed"
            );
        }

        return data.data.url;
    };

    // ==========================================
    // Image Select
    // ==========================================

    const handleImageChange = (event) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert(
                "Please select a valid image file."
            );

            event.target.value = "";
            return;
        }

        const maxSize =
            5 * 1024 * 1024;

        if (file.size > maxSize) {
            alert(
                "Image size must be less than 5MB."
            );

            event.target.value = "";
            return;
        }

        setPhotoFile(file);

        console.log(
            "Selected File:",
            file
        );

        console.log(
            "File Name:",
            file.name
        );
    };

    // ==========================================
    // Submit
    // ==========================================

    const onSubmit = async (data) => {
        try {
            // ==========================================
            // Image URL
            // ==========================================

            let imageUrl =
                doctor?.profileImage || "";

            // ==========================================
            // Upload New Image
            // ==========================================

            if (photoFile) {
                console.log(
                    "Uploading image:",
                    photoFile.name
                );

                imageUrl =
                    await uploadToImgBB(
                        photoFile
                    );

                console.log(
                    "ImgBB Image URL:",
                    imageUrl
                );
            }

            // ==========================================
            // Final Doctor Profile Data
            // ==========================================

            const doctorProfileData = {
                availableDays:
                    data.availableDays,

                consultationFee:
                    data.consultationFee,

                doctorName:
                    data.doctorName,

                experience:
                    data.experience,

                hospitalName:
                    data.hospitalName,

                profileImage:
                    imageUrl,

                qualifications:
                    data.qualifications,

                specialization:
                    data.specialization,

                doctorsEmail:
                    userEmail,

                availableSlots:
                    data.availableSlots,
            };

            console.log(
                "Final Doctor Profile:",
                doctorProfileData
            );

            // ==========================================
            // ADD NEW DOCTOR
            // ==========================================

            if (!doctor) {
                const resData =
                    await addDoctors(
                        doctorProfileData
                    );

                console.log(
                    "Add Doctor Response:",
                    resData
                );

                if (resData?.insertedId) {
                    toast.success(
                        "Doctor profile added successfully"
                    );

                    // After POST, GET again
                    const newDoctor =
                        await doctorProfile(
                            userEmail
                        );

                    if (newDoctor) {
                        setDoctor(newDoctor);

                        reset({
                            doctorName:
                                newDoctor.doctorName || "",

                            specialization:
                                newDoctor.specialization || "",

                            qualifications:
                                newDoctor.qualifications || "",

                            experience:
                                newDoctor.experience || "",

                            consultationFee:
                                newDoctor.consultationFee || "",

                            hospitalName:
                                newDoctor.hospitalName || "",

                            profileImage:
                                newDoctor.profileImage || "",

                            availableDays:
                                newDoctor.availableDays || [],

                            availableSlots:
                                newDoctor.availableSlots || [
                                    {
                                        startTime: "",
                                        endTime: "",
                                    },
                                ],
                        });

                        setSelectedDays(
                            newDoctor.availableDays || []
                        );
                    }
                }
            }

            // ==========================================
            // UPDATE EXISTING DOCTOR
            // ==========================================

            else {
                const updateRes =
                    await upDateDoctors(
                        doctorProfileData,
                        doctor._id
                    );

                console.log(
                    "Update Doctor Response:",
                    updateRes
                );

                if (
                    updateRes?.modifiedCount > 0 ||
                    updateRes?.matchedCount > 0
                ) {
                    toast.success(
                        "Doctor profile updated successfully"
                    );

                    // Update local doctor state
                    setDoctor({
                        ...doctor,
                        ...doctorProfileData,
                    });

                    // Clear selected file
                    setPhotoFile(null);
                }
            }
        } catch (error) {
            console.error(
                "Doctor profile submission failed:",
                error
            );

            alert(
                error.message ||
                "Failed to save doctor profile."
            );
        }
    };

    // ==========================================
    // JSX
    // ==========================================

    return (
        <div className="mx-auto w-full max-w-4xl">

            {/* HEADER */}

            <div className="mb-6">

                <h1 className="text-2xl font-semibold tracking-tight text-[#064b78] sm:text-3xl">
                    Doctor Profile Management
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                    Add and manage your professional
                    information, consultation details and
                    availability.
                </p>

            </div>

            {/* FORM CARD */}

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

                <Form
                    className="flex w-full flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {/* DOCTOR NAME */}

                    <TextField
                        isRequired
                        name="doctorName"
                        isInvalid={
                            !!errors.doctorName
                        }
                    >

                        <Label className="text-sm text-[#064b78]">
                            Doctor Name
                        </Label>

                        <div className="relative">

                            <Person className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <Input
                                {...register(
                                    "doctorName",
                                    {
                                        required:
                                            "Doctor name is required",

                                        minLength: {
                                            value: 3,
                                            message:
                                                "Doctor name must be at least 3 characters",
                                        },
                                    }
                                )}
                                className="w-full pl-9"
                                placeholder="Dr. John Doe"
                            />

                        </div>

                        {errors.doctorName && (
                            <FieldError>
                                {
                                    errors
                                        .doctorName
                                        .message
                                }
                            </FieldError>
                        )}

                    </TextField>


                    {/* SPECIALIZATION */}

                    <TextField
                        isRequired
                        name="specialization"
                        isInvalid={
                            !!errors.specialization
                        }
                    >

                        <Label className="text-sm text-[#064b78]">
                            Specialization
                        </Label>

                        <div
                            ref={
                                specializationRef
                            }
                            className="relative"
                        >

                            <Stethoscope className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <Input
                                {...register(
                                    "specialization",
                                    {
                                        required:
                                            "Specialization is required",
                                    }
                                )}
                                value={
                                    specializationValue ||
                                    ""
                                }
                                onChange={(e) => {
                                    setValue(
                                        "specialization",
                                        e.target.value,
                                        {
                                            shouldValidate:
                                                true,
                                            shouldDirty:
                                                true,
                                        }
                                    );
                                }}
                                className="w-full pl-9 pr-10"
                                placeholder="Select or type specialization"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setSpecializationOpen(
                                        (prev) =>
                                            !prev
                                    )
                                }
                                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400 transition hover:text-[#064b78]"
                            >

                                <ArrowChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        specializationOpen
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />

                            </button>

                            {specializationOpen && (
                                <div className="absolute left-0 right-0 top-[calc(100%+5px)] z-30 max-h-52 overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-lg">

                                    {specializationOptions.map(
                                        (item) => (
                                            <button
                                                key={
                                                    item
                                                }
                                                type="button"
                                                onClick={() =>
                                                    handleSpecializationSelect(
                                                        item
                                                    )
                                                }
                                                className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-[#eef5f8] hover:text-[#064b78]"
                                            >
                                                {
                                                    item
                                                }
                                            </button>
                                        )
                                    )}

                                    <div className="border-t border-gray-100 px-3 py-2 text-xs text-gray-400">
                                        Not listed? Type your own specialization above.
                                    </div>

                                </div>
                            )}

                        </div>

                        {errors.specialization && (
                            <FieldError>
                                {
                                    errors
                                        .specialization
                                        .message
                                }
                            </FieldError>
                        )}

                    </TextField>


                    {/* QUALIFICATIONS */}

                    <TextField
                        isRequired
                        name="qualifications"
                        isInvalid={
                            !!errors.qualifications
                        }
                    >

                        <Label className="text-sm text-[#064b78]">
                            Qualifications
                        </Label>

                        <div className="relative">

                            <GraduationCap className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <Input
                                {...register(
                                    "qualifications",
                                    {
                                        required:
                                            "Qualifications are required",
                                    }
                                )}
                                className="w-full pl-9"
                                placeholder="MBBS, FCPS"
                            />

                        </div>

                        {errors.qualifications && (
                            <FieldError>
                                {
                                    errors
                                        .qualifications
                                        .message
                                }
                            </FieldError>
                        )}

                    </TextField>


                    {/* EXPERIENCE + FEE */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* Experience */}

                        <TextField
                            isRequired
                            name="experience"
                            isInvalid={
                                !!errors.experience
                            }
                        >

                            <Label className="text-sm text-[#064b78]">
                                Experience
                            </Label>

                            <div className="relative">

                                <Briefcase className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <Input
                                    {...register(
                                        "experience",
                                        {
                                            required:
                                                "Experience is required",

                                            min: {
                                                value: 0,
                                                message:
                                                    "Experience cannot be negative",
                                            },
                                        }
                                    )}
                                    type="number"
                                    className="w-full pl-9"
                                    placeholder="8"
                                />

                            </div>

                            <Description>
                                Years of experience
                            </Description>

                            {errors.experience && (
                                <FieldError>
                                    {
                                        errors
                                            .experience
                                            .message
                                    }
                                </FieldError>
                            )}

                        </TextField>


                        {/* Consultation Fee */}

                        <TextField
                            isRequired
                            name="consultationFee"
                            isInvalid={
                                !!errors.consultationFee
                            }
                        >

                            <Label className="text-sm text-[#064b78]">
                                Consultation Fee
                            </Label>

                            <div className="relative">

                                <CircleDollar className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <Input
                                    {...register(
                                        "consultationFee",
                                        {
                                            required:
                                                "Consultation fee is required",

                                            min: {
                                                value: 0,
                                                message:
                                                    "Fee cannot be negative",
                                            },
                                        }
                                    )}
                                    type="number"
                                    className="w-full pl-9"
                                    placeholder="800"
                                />

                            </div>

                            <Description>
                                Consultation fee in BDT
                            </Description>

                            {errors.consultationFee && (
                                <FieldError>
                                    {
                                        errors
                                            .consultationFee
                                            .message
                                    }
                                </FieldError>
                            )}

                        </TextField>

                    </div>


                    {/* HOSPITAL */}

                    <TextField
                        isRequired
                        name="hospitalName"
                        isInvalid={
                            !!errors.hospitalName
                        }
                    >

                        <Label className="text-sm text-[#064b78]">
                            Hospital / Clinic Name
                        </Label>

                        <div className="relative">

                            <Factory className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <Input
                                {...register(
                                    "hospitalName",
                                    {
                                        required:
                                            "Hospital name is required",
                                    }
                                )}
                                className="w-full pl-9"
                                placeholder="MediCare Hospital"
                            />

                        </div>

                        {errors.hospitalName && (
                            <FieldError>
                                {
                                    errors
                                        .hospitalName
                                        .message
                                }
                            </FieldError>
                        )}

                    </TextField>


                    {/* PROFILE IMAGE */}

                    <TextField
                        name="profileImage"
                        isInvalid={
                            !!errors.profileImage
                        }
                    >

                        <Label className="text-sm text-[#064b78]">
                            Profile Image
                        </Label>

                        <div className="relative">

                            <Picture className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleImageChange
                                }
                                className="h-10 w-full cursor-pointer rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-600 file:mr-3 file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#064b78]"
                            />

                        </div>

                        {/* Existing Image */}

                        {doctor?.profileImage &&
                            !photoFile && (
                                <p className="mt-1 text-xs text-gray-500">
                                    Existing profile image is already saved.
                                </p>
                            )}

                        {/* Selected File */}

                        {photoFile && (
                            <p className="mt-1 text-xs text-gray-500">

                                Selected:{" "}

                                <span className="font-medium text-[#064b78]">
                                    {
                                        photoFile.name
                                    }
                                </span>

                            </p>
                        )}

                        <Description>
                            Upload your profile photo
                            (Maximum 5MB)
                        </Description>

                        {errors.profileImage && (
                            <FieldError>
                                {
                                    errors
                                        .profileImage
                                        .message
                                }
                            </FieldError>
                        )}

                    </TextField>


                    {/* AVAILABLE DAYS */}

                    <div
                        ref={daysRef}
                        className="flex flex-col gap-2"
                    >

                        <Label className="text-sm text-[#064b78]">
                            Available Days
                        </Label>

                        <div className="relative">

                            <Calendar className="pointer-events-none absolute left-3 top-3 z-10 h-4 w-4 text-gray-400" />

                            <button
                                type="button"
                                onClick={() =>
                                    setDaysOpen(
                                        (prev) =>
                                            !prev
                                    )
                                }
                                className="flex min-h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-left text-sm text-gray-700 outline-none transition hover:border-[#064b78]"
                            >

                                <span className="truncate">

                                    {selectedDays.length >
                                        0
                                        ? selectedDays.join(
                                            ", "
                                        )
                                        : "Select available days"}

                                </span>

                                <ArrowChevronDown
                                    className={`ml-2 h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                                        daysOpen
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />

                            </button>

                            {daysOpen && (
                                <div className="absolute left-0 right-0 top-[calc(100%+5px)] z-30 rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">

                                    {days.map(
                                        (day) => {
                                            const selected =
                                                selectedDays.includes(
                                                    day
                                                );

                                            return (
                                                <button
                                                    key={
                                                        day
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        handleDaySelect(
                                                            day
                                                        )
                                                    }
                                                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
                                                        selected
                                                            ? "bg-[#eef5f8] text-[#064b78]"
                                                            : "text-gray-700 hover:bg-gray-50"
                                                    }`}
                                                >

                                                    <span>
                                                        {
                                                            day
                                                        }
                                                    </span>

                                                    {selected && (
                                                        <Check className="h-4 w-4" />
                                                    )}

                                                </button>
                                            );
                                        }
                                    )}

                                </div>
                            )}

                        </div>

                        <input
                            type="hidden"
                            {...register(
                                "availableDays",
                                {
                                    validate:
                                        (value) =>
                                            value?.length >
                                                0 ||
                                            "Please select at least one available day",
                                }
                            )}
                        />

                        {selectedDays.length >
                            0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">

                                    {selectedDays.map(
                                        (day) => (
                                            <span
                                                key={
                                                    day
                                                }
                                                className="rounded-full bg-[#eef5f8] px-2.5 py-1 text-xs font-medium text-[#064b78]"
                                            >
                                                {
                                                    day
                                                }
                                            </span>
                                        )
                                    )}

                                </div>
                            )}

                        <Description>
                            Select one or more days when
                            you are available.
                        </Description>

                        {errors.availableDays && (
                            <FieldError>
                                {
                                    errors
                                        .availableDays
                                        .message
                                }
                            </FieldError>
                        )}

                    </div>


                    {/* AVAILABLE TIME SLOT */}

                    <div className="flex flex-col gap-3">

                        <Label className="text-sm text-[#064b78]">
                            Available Time Slot
                        </Label>

                        <div className="rounded-xl border border-gray-200 p-3.5">

                            <div className="mb-3 flex items-center gap-2">

                                <Clock className="h-4 w-4 text-gray-400" />

                                <span className="text-sm font-medium text-[#064b78]">
                                    Consultation Hours
                                </span>

                            </div>

                            <div className="grid grid-cols-2 gap-3">

                                {/* Start Time */}

                                <div>

                                    <Label className="mb-1 block text-xs text-gray-500">
                                        Start Time
                                    </Label>

                                    <Input
                                        {...register(
                                            "availableSlots.0.startTime"
                                        )}
                                        type="time"
                                        className="w-full"
                                    />

                                </div>


                                {/* End Time */}

                                <div>

                                    <Label className="mb-1 block text-xs text-gray-500">
                                        End Time
                                    </Label>

                                    <Input
                                        {...register(
                                            "availableSlots.0.endTime"
                                        )}
                                        type="time"
                                        className="w-full"
                                    />

                                </div>

                            </div>

                        </div>

                        <Description>
                            Add your available consultation hours.
                        </Description>

                    </div>


                    {/* SUBMIT */}

                    <div className="mt-2 flex justify-end border-t border-gray-100 pt-5">

                        <Button
                            type="submit"
                            className="w-full bg-[#064b78] px-7 py-2.5 text-white hover:bg-[#053d61] sm:w-auto"
                        >

                            <Check className="h-4 w-4" />

                            {doctor
                                ? "Update Doctor Profile"
                                : "Save Doctor Profile"}

                        </Button>

                    </div>

                </Form>

            </div>

        </div>
    );
};

export default DoctorProfileForm;

