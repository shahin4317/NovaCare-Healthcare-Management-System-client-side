import React from "react";
import { Stethoscope } from "@gravity-ui/icons";

const loading = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f8fbfc] px-4">
            <div className="flex flex-col items-center text-center">

                {/* Logo / Icon */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-[#064b78] shadow-lg">
                    <Stethoscope className="h-10 w-10 text-white" />

                    {/* Pulse */}
                    <span className="absolute inset-0 animate-ping rounded-2xl bg-[#064b78]/20" />
                </div>

                {/* Brand */}
                <h2 className="mt-6 text-xl font-bold text-[#12344d]">
                    NovaCare
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Preparing your healthcare experience...
                </p>

                {/* Loading Spinner */}
                <div className="mt-6 h-8 w-8 animate-spin rounded-full border-4 border-[#dfe8ec] border-t-[#064b78]" />

                <p className="mt-4 text-xs font-medium text-gray-400">
                    Please wait
                </p>
            </div>
        </main>
    );
};

export default loading;