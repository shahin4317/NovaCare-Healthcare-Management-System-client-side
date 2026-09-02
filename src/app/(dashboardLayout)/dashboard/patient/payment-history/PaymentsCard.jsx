
"use client";

import React from "react";
import {
    CreditCard,
    Check,
    Calendar,
    ArrowUpRight,
    Receipt,
} from "@gravity-ui/icons";

const PaymentsCard = ({ payments = [] }) => {

    console.log(payments, "page");


    // ================= Total Payment =================

    const totalPaid = payments.reduce(
        (total, payment) => total + Number(payment.amount || 0),
        0
    );


    // Stripe amount is stored in cents
    const totalAmount = totalPaid / 100;


    // ================= Date Formatter =================

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };


    return (
        <div className="space-y-6">


            {/* ================================================= */}
            {/* Payment Summary */}
            {/* ================================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


                {/* Total Paid */}

                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                    <div className="flex items-start justify-between">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF5FF] text-[#0074D4]">
                            <CreditCard size={21} />
                        </div>


                        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400">
                            
                        </div>

                    </div>


                    <div className="mt-5">

                        <p className="text-sm font-medium text-slate-500">
                            Total Payments
                        </p>


                        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                            ${totalAmount.toFixed(2)}
                        </h2>


                        <p className="mt-1 text-xs text-slate-400">
                            Total amount paid
                        </p>

                    </div>


                    <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-[#EAF5FF] opacity-60 transition-all duration-300 group-hover:scale-150" />

                </div>


                {/* Paid Appointments */}

                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                    <div className="flex items-start justify-between">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <Receipt size={21} />
                        </div>


                        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400">
                      
                        </div>

                    </div>


                    <div className="mt-5">

                        <p className="text-sm font-medium text-slate-500">
                            Paid Appointments
                        </p>


                        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                            {payments.length}
                        </h2>


                        <p className="mt-1 text-xs text-slate-400">
                            Successfully paid appointments
                        </p>

                    </div>


                    <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-emerald-50 opacity-60 transition-all duration-300 group-hover:scale-150" />

                </div>

            </div>


            {/* ================================================= */}
            {/* Transaction Records */}
            {/* ================================================= */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">


                {/* Header */}

                <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF5FF] text-[#0074D4]">
                            <CreditCard size={19} />
                        </div>


                        <div>

                            <h2 className="text-lg font-bold text-slate-900">
                                Transaction Records
                            </h2>


                            <p className="mt-0.5 text-xs text-slate-500">
                                Your payment transaction history
                            </p>

                        </div>

                    </div>


                    <span className="w-fit rounded-full bg-[#EAF5FF] px-3 py-1.5 text-xs font-semibold text-[#0074D4]">
                        {payments.length} Transactions
                    </span>

                </div>


                {/* Table Header */}

                <div className="hidden grid-cols-[1.5fr_1fr_1.5fr_1fr_auto] items-center gap-4 bg-slate-50/70 px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 lg:grid">

                    <span>Transaction</span>

                    <span>Date</span>

                    <span>Appointment ID</span>

                    <span>Amount</span>

                    <span>Status</span>

                </div>


                {/* Payment List */}

                <div className="divide-y divide-slate-100">

                    {payments.length > 0 ? (

                        payments.map((payment) => (

                            <div
                                key={payment._id}
                                className="grid gap-4 px-5 py-5 transition hover:bg-slate-50/60 lg:grid-cols-[1.5fr_1fr_1.5fr_1fr_auto] lg:items-center lg:gap-4 lg:px-6"
                            >


                                {/* Transaction ID */}

                                <div className="min-w-0">

                                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                                        Transaction
                                    </p>


                                    <p
                                        className="mt-1 truncate text-sm font-semibold text-slate-700"
                                        title={payment.transactionId}
                                    >
                                        {payment.transactionId}
                                    </p>

                                </div>


                                {/* Payment Date */}

                                <div>

                                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                                        Payment Date
                                    </p>


                                    <div className="mt-1 flex items-center gap-2">

                                        <Calendar
                                            size={15}
                                            className="text-slate-400"
                                        />

                                        <p className="text-sm font-medium text-slate-600">
                                            {formatDate(payment.paymentDate)}
                                        </p>

                                    </div>

                                </div>


                                {/* Appointment ID */}

                                <div className="min-w-0">

                                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                                        Appointment ID
                                    </p>


                                    <p
                                        className="mt-1 truncate text-xs font-medium text-slate-500"
                                        title={payment.appointmentId}
                                    >
                                        {payment.appointmentId}
                                    </p>

                                </div>


                                {/* Amount */}

                                <div>

                                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                                        Amount
                                    </p>


                                    <p className="mt-1 text-base font-bold text-slate-900">
                                        ${(Number(payment.amount) / 100).toFixed(2)}
                                    </p>

                                </div>


                                {/* Status */}

                                <div>

                                    <div className="flex w-fit items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold capitalize text-emerald-600">

                                        <Check size={13} />

                                        {payment.paymentStatus}

                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (

                        /* Empty State */

                        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                                <CreditCard size={25} />
                            </div>


                            <h3 className="mt-4 text-sm font-semibold text-slate-900">
                                No payment records
                            </h3>


                            <p className="mt-1 max-w-sm text-xs text-slate-500">
                                You don't have any payment transactions yet.
                            </p>

                        </div>

                    )}

                </div>

            </section>

        </div>
    );
};

export default PaymentsCard;

