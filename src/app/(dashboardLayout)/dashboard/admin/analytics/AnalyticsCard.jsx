
"use client";

import React, { useMemo } from "react";
import {
    Person,
    Stethoscope,
    Calendar,
    ArrowUpRight,
} from "@gravity-ui/icons";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


const AnalyticsCard = ({ appointments = [], users = [] }) => {

    // =========================
    // USERS COUNT
    // =========================

    const totalPatients = users.filter(
        (user) => user.role?.toLowerCase() === "patient"
    ).length;

    const totalDoctors = users.filter(
        (user) => user.role?.toLowerCase() === "doctor"
    ).length;

    const totalAppointments = appointments.length;


    // =========================
    // APPOINTMENT CHART DATA
    // =========================

    const chartData = useMemo(() => {

        const groupedAppointments = {};

        appointments.forEach((appointment) => {

            if (!appointment.appointmentDate) return;

            const date = appointment.appointmentDate;

            if (!groupedAppointments[date]) {
                groupedAppointments[date] = 0;
            }

            groupedAppointments[date]++;
        });


        return Object.entries(groupedAppointments)
            .sort(([dateA], [dateB]) => {
                return new Date(dateA) - new Date(dateB);
            })
            .map(([date, count]) => {

                const formattedDate = new Date(date).toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "numeric",
                    }
                );

                return {
                    date: formattedDate,
                    appointments: count,
                };
            });

    }, [appointments]);


    // =========================
    // ANALYTICS CARDS
    // =========================

    const analytics = [
        {
            title: "Total Patients",
            value: totalPatients,
            description: "Registered patients",
            icon: Person,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            lineColor: "bg-blue-600",
            badge: "Patients",
        },
        {
            title: "Total Doctors",
            value: totalDoctors,
            description: "Available doctors",
            icon: Stethoscope,
            iconBg: "bg-violet-50",
            iconColor: "text-violet-600",
            lineColor: "bg-violet-600",
            badge: "Doctors",
        },
        {
            title: "Total Appointments",
            value: totalAppointments,
            description: "All appointments",
            icon: Calendar,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            lineColor: "bg-emerald-600",
            badge: "Appointments",
        },
    ];


    return (
        <div className="w-full">

            {/* =========================================
                HEADER
            ========================================= */}

            <div className="mb-5">

                <p className="text-sm font-semibold text-blue-600">
                    Overview
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    Analytics Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Monitor your patients, doctors and appointments at a glance.
                </p>

            </div>


            {/* =========================================
                ANALYTICS CARDS
            ========================================= */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {analytics.map((item) => {

                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                        >

                            {/* Decorative Circle */}
                            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-slate-50 transition-transform duration-500 group-hover:scale-150" />


                            {/* Top */}
                            <div className="relative flex items-start justify-between">

                                {/* Icon */}
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor}`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>


                                {/* Badge */}
                                <div className="flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">

                                    {item.badge}

                                    <ArrowUpRight className="h-3.5 w-3.5" />

                                </div>

                            </div>


                            {/* Content */}
                            <div className="relative mt-6">

                                <p className="text-sm font-medium text-slate-500">
                                    {item.title}
                                </p>

                                <h3 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                                    {item.value}
                                </h3>

                                <p className="mt-2 text-xs text-slate-400">
                                    {item.description}
                                </p>

                            </div>


                            {/* Bottom Line */}
                            <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-slate-100">

                                <div
                                    className={`h-full w-2/3 rounded-full ${item.lineColor} transition-all duration-500 group-hover:w-full`}
                                />

                            </div>

                        </div>
                    );
                })}

            </div>


            {/* =========================================
                APPOINTMENT CHART
            ========================================= */}

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                {/* Chart Header */}
                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                    <div>

                        <p className="text-sm font-semibold text-blue-600">
                            Appointment Analytics
                        </p>

                        <h3 className="mt-1 text-xl font-bold text-slate-900">
                            Appointment Overview
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Track appointment activity over time.
                        </p>

                    </div>


                    {/* Total */}
                    <div className="flex w-fit items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <Calendar className="h-5 w-5" />
                        </div>

                        <div>

                            <p className="text-xs font-medium text-slate-400">
                                Total
                            </p>

                            <p className="text-lg font-bold text-slate-900">
                                {totalAppointments}
                            </p>

                        </div>

                    </div>

                </div>


                {/* Chart */}
                <div className="p-4 sm:p-6">

                    {chartData.length > 0 ? (

                        <div className="h-[300px] w-full sm:h-[350px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <LineChart
                                    data={chartData}
                                    margin={{
                                        top: 10,
                                        right: 15,
                                        left: -15,
                                        bottom: 5,
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fontSize: 12,
                                        }}
                                    />

                                    <YAxis
                                        allowDecimals={false}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fontSize: 12,
                                        }}
                                    />

                                    <Tooltip
                                        cursor={{
                                            strokeDasharray: "4 4",
                                        }}
                                        contentStyle={{
                                            borderRadius: "14px",
                                            border: "1px solid #e2e8f0",
                                            boxShadow:
                                                "0 10px 30px rgba(15, 23, 42, 0.08)",
                                        }}
                                        labelStyle={{
                                            fontWeight: 600,
                                            marginBottom: 4,
                                        }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="appointments"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={{
                                            r: 4,
                                        }}
                                        activeDot={{
                                            r: 6,
                                        }}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    ) : (

                        /* Empty Chart */
                        <div className="flex h-[300px] flex-col items-center justify-center text-center">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">

                                <Calendar className="h-7 w-7" />

                            </div>

                            <h4 className="mt-4 text-sm font-bold text-slate-700">
                                No Appointment Data
                            </h4>

                            <p className="mt-1 text-xs text-slate-400">
                                Appointment activity will appear here.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default AnalyticsCard;

