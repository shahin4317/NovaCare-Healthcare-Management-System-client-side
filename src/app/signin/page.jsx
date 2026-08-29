
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Check,
    Person,
    Envelope,
    Lock,
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
import { useRouter } from "next/navigation";

const SigninPage = () => {
    // ==========================================
    // States
    // ==========================================

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // ==========================================
    // Router
    // ==========================================

    const router = useRouter();

    // ==========================================
    // React Hook Form
    // ==========================================

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // ==========================================
    // Login Submit
    // ==========================================

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            console.log("Login Data:", data);

            // ==========================================
            // Better Auth Sign In
            // ==========================================

            const {
                data: signInData,
                error: signInError,
            } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            console.log("BetterAuth Data:", signInData);
            console.log("BetterAuth Error:", signInError);

            // ==========================================
            // Error
            // ==========================================

            if (signInError) {
                alert(signInError.message || "Invalid email or password");
                return;
            }

            // ==========================================
            // Success
            // ==========================================

            if (signInData) {
                alert("Login successful!");

                router.push("/");
                router.refresh();
            }
        } catch (error) {
            console.error("Login failed:", error);

            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // JSX
    // ==========================================

    return (
        <main className="min-h-[calc(100vh-76px)] bg-[#f8fbfc]">

            <div className="mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-[1200px] items-center justify-center px-5 py-12 sm:px-8">

                {/* Login Card */}

                <div className="w-full max-w-[500px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">

                    {/* Header */}

                    <div className="mb-8 text-center">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef5f8]">

                            <Person className="h-7 w-7 text-[#064b78]" />

                        </div>

                        <h1 className="text-3xl font-semibold tracking-tight text-[#064b78] sm:text-4xl">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Sign in to continue to your account
                        </p>

                    </div>

                    {/* Form */}

                    <Form
                        className="flex w-full flex-col gap-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >

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
                                Enter your account password
                            </Description>

                            {errors.password && (
                                <FieldError>
                                    {errors.password.message}
                                </FieldError>
                            )}

                        </TextField>





                        {/* ================= LOGIN BUTTON ================= */}

                        <div className="mt-1 flex w-full">

                            <Button
                                type="submit"
                                isDisabled={loading}
                                className="flex-1 bg-[#064b78] text-white hover:bg-[#053d61]"
                            >

                                <Check className="h-4 w-4" />

                                {loading
                                    ? "Signing in..."
                                    : "Sign in"}

                            </Button>

                        </div>

                    </Form>


                    {/* Bottom Text */}

                    <p className="mt-6 text-center text-sm text-gray-500">

                        Don't have an account?{" "}

                        <a
                            href="/signup"
                            className="font-semibold text-[#064b78] hover:underline"
                        >
                            Create account
                        </a>

                    </p>

                </div>

            </div>

        </main>
    );
};

export default SigninPage;

