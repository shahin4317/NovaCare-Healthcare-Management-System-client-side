import React from "react";
import Link from "next/link";
import {
    Stethoscope,
    CircleCheck,
    Calendar,
    Person,
} from "@gravity-ui/icons";

const About = () => {
    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

                    {/* Left Content */}
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#064b78]">
                            About NovaCare
                        </p>

                        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#12344d] sm:text-4xl">
                            Making Healthcare
                            <span className="text-[#064b78]">
                                {" "}Simple & Accessible
                            </span>
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
                            NovaCare is a modern healthcare platform designed
                            to make healthcare easier, faster and more
                            accessible. Patients can discover trusted doctors,
                            explore medical specializations and book
                            appointments from one convenient platform.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                            Our goal is to connect patients with qualified
                            healthcare professionals while providing a smooth
                            and reliable healthcare experience.
                        </p>

                        {/* Features */}
                        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5f8]">
                                    <CircleCheck className="h-5 w-5 text-[#064b78]" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#12344d]">
                                        Trusted Doctors
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Qualified professionals
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5f8]">
                                    <Calendar className="h-5 w-5 text-[#064b78]" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#12344d]">
                                        Easy Booking
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Quick appointments
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5f8]">
                                    <Person className="h-5 w-5 text-[#064b78]" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#12344d]">
                                        Patient Focused
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Care that matters
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5f8]">
                                    <Stethoscope className="h-5 w-5 text-[#064b78]" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#12344d]">
                                        Quality Care
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Better healthcare
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <Link
                            href="/about"
                            className="mt-8 inline-flex items-center rounded-xl bg-[#064b78] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#053d61] hover:shadow-md active:scale-95"
                        >
                            Learn More
                        </Link>
                    </div>

                    {/* Right Visual */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-3xl bg-[#eef5f8] p-6 sm:p-8">

                            {/* Main Card */}
                            <div className="rounded-2xl border border-[#dfe8ec] bg-white p-6 shadow-sm sm:p-8">

                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#064b78]">
                                        <Stethoscope className="h-8 w-8 text-white" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Healthcare Platform
                                        </p>

                                        <h3 className="mt-1 text-xl font-bold text-[#12344d]">
                                            NovaCare
                                        </h3>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    {[
                                        "Find qualified doctors",
                                        "Explore medical specialties",
                                        "Book appointments easily",
                                        "Manage your healthcare",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3"
                                        >
                                            <CircleCheck className="h-5 w-5 shrink-0 text-[#064b78]" />

                                            <span className="text-sm font-medium text-gray-600">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom Stats */}
                                <div className="mt-8 grid grid-cols-2 gap-3 border-t border-gray-100 pt-6">
                                    <div className="rounded-xl bg-[#f8fbfc] p-4">
                                        <p className="text-2xl font-bold text-[#064b78]">
                                            24/7
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Healthcare Access
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-[#f8fbfc] p-4">
                                        <p className="text-2xl font-bold text-[#064b78]">
                                            Easy
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Appointment Booking
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-[#064b78]/10" />
                            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-[#064b78]/10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;