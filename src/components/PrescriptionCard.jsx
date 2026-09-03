
"use client";

import { useEffect, useState } from "react";
import {
    FileText,
    Pill,
    Stethoscope,
    CircleCheck,
} from "@gravity-ui/icons";

import { addPrescriptions } from "@/lib/api/prescriptions/actions";
import toast from "react-hot-toast";

const PrescriptionCard = ({
    appointmentId,
    patientName,
    doctorId,
    existingPrescription = null,
}) => {
    const [diagnosis, setDiagnosis] = useState("");
    const [medicine, setMedicine] = useState("");
    const [advice, setAdvice] = useState("");

    const [prescription, setPrescription] = useState(null);

    const [loading, setLoading] = useState(false);
    console.log(existingPrescription);

    /*
    ============================================================
    EXISTING PRESCRIPTION CHECK

    API theke prescription na thakle:
    {
        message: "Prescription not found"
    }

    tokhon prescription = null hobe.

    Actual prescription thakle:
    {
        _id: "...",
        appointmentId: "...",
        diagnosis: "...",
        medicine: "...",
        advice: "..."
    }

    tokhon prescription set hobe.
    ============================================================
    */

    useEffect(() => {
        console.log(
            "Existing Prescription:",
            existingPrescription
        );

        // Kono data nei
        if (!existingPrescription) {
            setPrescription(null);
            return;
        }

        // API bolche prescription nei
        if (
            existingPrescription.message ===
            "Prescription not found"
        ) {
            setPrescription(null);
            return;
        }

        /*
         * Actual prescription data hole set korbo
         */
        if (
            existingPrescription.appointmentId ||
            existingPrescription._id
        ) {
            setPrescription(existingPrescription);
            return;
        }

        // Unknown/empty data hole form show korbo
        setPrescription(null);
    }, [existingPrescription]);

    /*
    ============================================================
    ISSUE PRESCRIPTION
    ============================================================
    */

    const handleIssuePrescription = async (e) => {
        e.preventDefault();

        if (
            !diagnosis.trim() ||
            !medicine.trim() ||
            !advice.trim()
        ) {
            toast.error(
                "Please fill all prescription fields"
            );

            return;
        }

        const newPrescription = {
            appointmentId,
            patientName,
            diagnosis,
            medicine,
            advice,
            doctorId,
            issuedAt: new Date().toISOString(),
        };

        try {
            setLoading(true);

            const api = await addPrescriptions(
                newPrescription
            );

            console.log(
                "Saved Prescription:",
                api
            );

            if (api) {
                toast.success(
                    "Prescription Issued Successfully"
                );

                /*
                 * API actual prescription object return korle
                 * seta show korbo.
                 *
                 * API sudhu true return korle
                 * newPrescription show korbo.
                 */

                const savedPrescription =
                    typeof api === "object" &&
                    !api.message
                        ? api
                        : newPrescription;

                setPrescription(
                    savedPrescription
                );

                // Form clear
                setDiagnosis("");
                setMedicine("");
                setAdvice("");
            } else {
                toast.error(
                    "Something Went Wrong"
                );
            }
        } catch (error) {
            console.error(
                "Prescription Error:",
                error
            );

            toast.error(
                "Something Went Wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            {/* =====================================================
                PRESCRIPTION FORM

                Prescription na thakle eta show korbe
            ====================================================== */}

            {!prescription && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">

                    {/* Header */}
                    <div className="mb-7 flex items-center gap-4 border-b border-slate-100 pb-5">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">

                            <FileText className="h-6 w-6 text-blue-600" />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Prescription
                            </h2>

                            <p className="text-sm text-slate-500">
                                Add diagnosis, medicine and advice
                            </p>

                        </div>

                    </div>

                    {/* Patient Info */}
                    <div className="mb-6 rounded-xl bg-slate-50 p-4">

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Patient
                        </p>

                        <p className="mt-1 text-base font-semibold text-slate-900">
                            {patientName || "Patient"}
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={
                            handleIssuePrescription
                        }
                        className="space-y-5"
                    >

                        {/* Diagnosis */}
                        <div>

                            <label
                                htmlFor="diagnosis"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Diagnosis / Disease
                            </label>

                            <div className="relative">

                                <Stethoscope className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="diagnosis"
                                    type="text"
                                    value={diagnosis}
                                    onChange={(e) =>
                                        setDiagnosis(
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. Fever, Viral Infection"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                            </div>

                        </div>

                        {/* Medicine */}
                        <div>

                            <label
                                htmlFor="medicine"
                                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
                            >

                                <Pill className="h-4 w-4 text-slate-400" />

                                Medicine

                            </label>

                            <textarea
                                id="medicine"
                                rows={5}
                                value={medicine}
                                onChange={(e) =>
                                    setMedicine(
                                        e.target.value
                                    )
                                }
                                placeholder={`Write medicine details...

Example:
Napa 500mg - 1+1+1
Seclo 20mg - 1+0+1
Antacid - 1+1+1`}
                                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />

                        </div>

                        {/* Advice */}
                        <div>

                            <label
                                htmlFor="advice"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Advice
                            </label>

                            <textarea
                                id="advice"
                                rows={5}
                                value={advice}
                                onChange={(e) =>
                                    setAdvice(
                                        e.target.value
                                    )
                                }
                                placeholder={`Write advice for the patient...

Example:
Take plenty of rest.
Drink enough water.
Avoid oily food.`}
                                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {loading ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                                    Issuing Prescription...
                                </>
                            ) : (
                                <>
                                    <FileText className="h-5 w-5" />

                                    Issue Prescription
                                </>
                            )}

                        </button>

                    </form>

                </div>
            )}

            {/* =====================================================
                SAVED PRESCRIPTION

                Prescription thakle eta show korbe
            ====================================================== */}

            {prescription && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    {/* Header */}
                    <div className="border-b border-slate-200 bg-slate-900 px-5 py-6 text-white md:px-7">

                        <div className="flex items-center justify-between gap-4">

                            <div>

                                <div className="mb-2 flex items-center gap-2">

                                    <CircleCheck className="h-5 w-5 text-green-400" />

                                    <span className="text-sm font-medium text-green-400">
                                        Prescription Issued
                                    </span>

                                </div>

                                <h2 className="text-xl font-bold">
                                    Prescription Details
                                </h2>

                            </div>

                            {/* Date */}
                            <div className="hidden text-right sm:block">

                                <p className="text-xs text-slate-400">
                                    Date
                                </p>

                                <p className="mt-1 text-sm font-medium">

                                    {prescription.issuedAt
                                        ? new Date(
                                            prescription.issuedAt
                                        ).toLocaleDateString()
                                        : new Date().toLocaleDateString()}

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Body */}
                    <div className="p-5 md:p-7">

                        {/* Patient */}
                        <div className="mb-7">

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Patient Name
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-900">

                                {prescription.patientName ||
                                    patientName ||
                                    "Patient"}

                            </p>

                        </div>

                        <div className="space-y-5">

                            {/* Diagnosis */}
                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">

                                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">

                                    <Stethoscope className="h-4 w-4" />

                                    Diagnosis

                                </p>

                                <p className="text-base font-medium text-slate-900">

                                    {prescription.diagnosis}

                                </p>

                            </div>

                            {/* Medicine */}
                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">

                                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">

                                    <Pill className="h-4 w-4" />

                                    Medicine

                                </p>

                                <p className="whitespace-pre-line text-sm leading-6 text-slate-700">

                                    {prescription.medicine}

                                </p>

                            </div>

                            {/* Advice */}
                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">

                                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Advice
                                </p>

                                <p className="whitespace-pre-line text-sm leading-6 text-slate-700">

                                    {prescription.advice}

                                </p>

                            </div>

                        </div>

                        {/* Appointment ID */}
                        <div className="mt-7 border-t border-slate-100 pt-5">

                            <p className="text-xs text-slate-400">
                                Appointment ID
                            </p>

                            <p className="mt-1 break-all text-xs font-medium text-slate-600">

                                {prescription.appointmentId ||
                                    appointmentId}

                            </p>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default PrescriptionCard;

