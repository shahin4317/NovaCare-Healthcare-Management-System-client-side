import React from "react";
import {
    Stethoscope,
    Person,
    Calendar,
} from "@gravity-ui/icons";

import { getAppoinments, getUserDetails } from "@/lib/api/admin/data";


const Platform = async () => {
    const [appointments, users] = await Promise.all([
        getAppoinments(),
        getUserDetails(),
    ]);

    const totalAppointments = appointments?.length || 0;

    const totalDoctors =
        users?.filter((user) => user.role === "doctor").length || 0;

    const totalPatients =
        users?.filter((user) => user.role === "patient").length || 0;

    const statistics = [
        {
            title: "Total Doctors",
            value: totalDoctors,
            icon: Stethoscope,
        },
        {
            title: "Total Patients",
            value: totalPatients,
            icon: Person,
        },
        {
            title: "Total Appointments",
            value: totalAppointments,
            icon: Calendar,
        },
    ];

    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="mb-10 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#064b78]">
                        Our Platform
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#12344d] sm:text-4xl">
                        Platform Statistics
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                        A quick overview of our healthcare platform and
                        growing medical community.
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {statistics.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <article
                                key={stat.title}
                                className="group rounded-2xl border border-[#dfe8ec] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
                            >
                                <div className="flex items-center justify-between">

                                    {/* Icon */}
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5f8] transition-colors duration-300 group-hover:bg-[#064b78]">
                                        <Icon className="h-7 w-7 text-[#064b78] transition-colors duration-300 group-hover:text-white" />
                                    </div>

                                    {/* Number */}
                                    <p className="text-4xl font-bold text-[#12344d]">
                                        {stat.value}
                                    </p>
                                </div>

                                {/* Title */}
                                <div className="mt-5">
                                    <h3 className="text-lg font-semibold text-[#12344d]">
                                        {stat.title}
                                    </h3>

                                    <div className="mt-2 h-1 w-10 rounded-full bg-[#064b78]" />
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Platform;