
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import {
    Check,
    Person,
    Envelope,
    Lock,
    Picture,
    Eye,
    EyeSlash,
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

import { authClient } from "@/lib/auth-client";




const SignupPage = () => {
  
  
    // ==========================================
    // States
    // ==========================================

    // Password show / hide
    const [showPassword, setShowPassword] = useState(false);

    // Selected image file
    const [photoFile, setPhotoFile] = useState(null);

    // ==========================================
    // React Hook Form
    // ==========================================

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // ==========================================
    // ImgBB Image Upload
    // ==========================================

    const uploadToImgBB = async (file) => {
        const formData = new FormData();

        // Selected image file ImgBB-তে পাঠানো হচ্ছে
        formData.append("image", file);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        console.log("ImgBB Response:", data);

        // Upload failed হলে error
        if (!data.success) {
            throw new Error(
                data.error?.message || "Image upload failed"
            );
        }

        // ImgBB থেকে image URL return করবে
        return data.data.url;
    };

    // ==========================================
    // Form Submit
    // ==========================================

    const onSubmit = async (data) => {
        try {
            // প্রথমে image URL empty
            let imageUrl = "";

            // ==========================================
            // Upload image to ImgBB
            // ==========================================

            if (photoFile) {
                console.log(
                    "Uploading image:",
                    photoFile.name
                );

                imageUrl = await uploadToImgBB(photoFile);

                console.log(
                    "ImgBB Image URL:",
                    imageUrl
                );
            }

            // ==========================================
            // Final Signup Data
            // ==========================================

            const signupData = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                image: imageUrl,
            };

            console.log(
                "Final Signup Data:",
                signupData
            );

            // ==========================================
            // Better Auth Signup
            // ==========================================

            const {
                data: signUpData,
                error: signUpError,

            } = await authClient.signUp.email(signupData);
            if (signUpData) {
                alert('SignUp Success')
                
            }
            if (signUpError) {
                alert(signUpError.message)
            }


            console.log(
                "BetterAuth Data:",
                signUpData
            );

            console.log(
                "BetterAuth Error:",
                signUpError
            );

        } catch (error) {
            console.error(
                "Signup failed:",
                error
            );
        }
    };

    // ==========================================
    // JSX
    // ==========================================

    return (
        <main className="min-h-[calc(100vh-76px)] bg-[#f8fbfc]">

            <div className="mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-[1200px] items-center justify-center px-5 py-12 sm:px-8">

                {/* Signup Card */}

                <div className="w-full max-w-[500px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">

                    {/* Header */}

                    <div className="mb-8 text-center">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef5f8]">

                            <Person className="h-7 w-7 text-[#064b78]" />

                        </div>

                        <h1 className="text-3xl font-semibold tracking-tight text-[#064b78] sm:text-4xl">
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Join us and experience better healthcare
                        </p>

                    </div>


                    {/* Form */}

                    <Form
                        className="flex w-full flex-col gap-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        {/* ================= NAME ================= */}

                        <TextField
                            isRequired
                            name="name"
                            isInvalid={!!errors.name}
                        >

                            <Label className="text-[#064b78]">
                                Name
                            </Label>

                            <div className="relative">

                                <Person className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <Input
                                    {...register("name", {
                                        required:
                                            "Name is required",

                                        minLength: {
                                            value: 2,
                                            message:
                                                "Name must be at least 2 characters",
                                        },
                                    })}
                                    className="w-full pl-10"
                                    placeholder="Enter your name"
                                />

                            </div>

                            {errors.name && (
                                <FieldError>
                                    {errors.name.message}
                                </FieldError>
                            )}

                        </TextField>


                        {/* ================= EMAIL ================= */}

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            isInvalid={!!errors.email}
                        >

                            <Label className="text-[#064b78]">
                                Email address
                            </Label>

                            <div className="relative">

                                <Envelope className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <Input
                                    {...register("email", {
                                        required:
                                            "Email address is required",

                                        pattern: {
                                            value:
                                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

                                            message:
                                                "Please enter a valid email address",
                                        },
                                    })}
                                    className="w-full pl-10"
                                    placeholder="john@example.com"
                                    type="email"
                                />

                            </div>

                            {errors.email && (
                                <FieldError>
                                    {errors.email.message}
                                </FieldError>
                            )}

                        </TextField>


                        {/* ================= PHOTO ================= */}

                        {/* ================= PHOTO ================= */}

                        <TextField
                            name="image"
                            isInvalid={!!errors.image}
                        >
                            <Label className="text-[#064b78]">
                                Profile Photo
                            </Label>

                            <div className="relative">

                                <Picture className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                {/* Native File Input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];

                                        if (file) {
                                            setPhotoFile(file);

                                            console.log("Selected File:", file);
                                            console.log("File Name:", file.name);
                                        }
                                    }}
                                    className="h-10 w-full cursor-pointer rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-600 file:mr-3 file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#064b78]"
                                />

                            </div>

                            {/* Selected File Name */}
                            {photoFile && (
                                <p className="mt-1 text-xs text-gray-500">
                                    Selected:{" "}
                                    <span className="font-medium text-[#064b78] items-center">
                                        {photoFile.name}
                                    </span>
                                </p>
                            )}

                            <Description>
                                Upload your profile photo
                            </Description>

                            {errors.image && (
                                <FieldError>
                                    {errors.image.message}
                                </FieldError>
                            )}
                        </TextField>


                        {/* ================= PASSWORD ================= */}

                        <TextField
                            isRequired
                            name="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            isInvalid={!!errors.password}
                        >

                            <Label className="text-[#064b78]">
                                Password
                            </Label>

                            <div className="relative">

                                {/* Lock Icon */}

                                <Lock className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />


                                <Input
                                    {...register("password", {

                                        required:
                                            "Password is required",

                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },

                                        validate: {

                                            number: (value) =>
                                                /[0-9]/.test(value) ||
                                                "Password must contain at least one number",

                                            special: (value) =>
                                                /[^A-Za-z0-9]/.test(value) ||
                                                "Password must contain at least one special character",

                                        },

                                    })}
                                    className="w-full pl-10 pr-10"
                                    placeholder="Enter your password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                />


                                {/* Password Toggle */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (prev) => !prev
                                        )
                                    }
                                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400 transition hover:text-[#064b78]"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >

                                    {showPassword ? (
                                        <EyeSlash className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}

                                </button>

                            </div>


                            <Description>
                                At least 6 characters, 1 number and 1 special character
                            </Description>


                            {errors.password && (
                                <FieldError>
                                    {errors.password.message}
                                </FieldError>
                            )}

                        </TextField>


                        {/* ================= ROLE ================= */}

                        <TextField
                            isRequired
                            name="role"
                            isInvalid={!!errors.role}
                        >

                            <Label className="text-[#064b78]">
                                Role
                            </Label>

                            <div className="relative">

                                <Person className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />


                                <select
                                    {...register("role", {
                                        required:
                                            "Role is required",
                                    })}
                                    className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-[#064b78]"
                                    defaultValue=""
                                >
                                    <option value="patient">
                                        Patient
                                    </option>


                                    <option value="doctor">
                                        Doctor
                                    </option>



                                </select>

                            </div>


                            {errors.role && (
                                <FieldError>
                                    {errors.role.message}
                                </FieldError>
                            )}

                        </TextField>


                        {/* ================= BUTTON ================= */}

                        <div className="mt-2 flex w-full gap-3">

                            <Button
                                type="submit"
                                className="flex-1 bg-[#064b78] text-white hover:bg-[#053d61]"
                            >

                                <Check className="h-4 w-4" />

                                Create account

                            </Button>

                        </div>

                    </Form>


                    {/* Bottom Text */}

                    <p className="mt-6 text-center text-sm text-gray-500">

                        Already have an account?{" "}

                        <a
                            href="/signin"
                            className="font-semibold text-[#064b78] hover:underline"
                        >
                            Sign in
                        </a>

                    </p>

                </div>

            </div>

        </main>
    );
};

export default SignupPage;
