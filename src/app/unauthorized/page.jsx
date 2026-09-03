
"use client";

import React from "react";
import Link from "next/link";
import {
    Shield,
    ArrowLeft,
    House,
    Lock,
} from "@gravity-ui/icons";

const UnauthorizedPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">

            <div className="w-full max-w-lg text-center">

                {/* Icon */}

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                    <Shield className="h-10 w-10 text-primary" />
                </div>


                {/* Error Code */}

                <p className="mt-6 text-sm font-bold tracking-widest text-primary">
                    403 • UNAUTHORIZED
                </p>


                {/* Heading */}

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Access Denied
                </h1>


                {/* Description */}

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                    You don't have permission to access this page.
                    Please make sure you're logged in with the correct
                    account or return to your dashboard.
                </p>


                {/* Info Card */}

                <div className="mx-auto mt-7 flex max-w-md items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <Lock className="h-5 w-5 text-slate-500" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-slate-800">
                            Restricted Access
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            This area is only available to authorized
                            NovaCare users.
                        </p>
                    </div>

                </div>


                {/* Buttons */}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </button>


                    <Link
                        href="/signin"
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-black shadow-sm transition-all hover:opacity-90"
                    >
                        <House className="h-4 w-4" />
                      Sign In
                    </Link>

                </div>


                {/* Brand */}

                <p className="mt-10 text-xs font-medium text-slate-400">
                    NovaCare Healthcare Platform
                </p>

            </div>

        </div>
    );
};

export default UnauthorizedPage;

