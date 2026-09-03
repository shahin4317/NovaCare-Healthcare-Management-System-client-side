
import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft, Stethoscope } from "@gravity-ui/icons";

const Page = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg text-center">

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 shadow-sm">
                    <FileText className="h-12 w-12" />
                </div>

                {/* Small Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                    <Stethoscope className="h-4 w-4" />
                    Prescription
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    No Prescription Found
                </h1>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                    You don’t have any prescription available right now.
                    Once your doctor issues a prescription, it will appear here.
                </p>

                {/* Empty State Box */}
                <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6">
                    <div className="flex flex-col items-center">
                        <div className="mb-3 rounded-xl bg-white p-3 shadow-sm">
                            <FileText className="h-6 w-6 text-slate-400" />
                        </div>

                        <p className="text-sm font-medium text-slate-700">
                            Your prescription list is empty
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Check back after your next doctor consultation.
                        </p>
                    </div>
                </div>

                {/* Back Button */}
                <Link
                    href="/dashboard/doctor/appointments"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                    <ArrowLeft className="h-4 w-4" />
                   Select a Patient
                </Link>

            </div>
        </div>
    );
};

export default Page;
