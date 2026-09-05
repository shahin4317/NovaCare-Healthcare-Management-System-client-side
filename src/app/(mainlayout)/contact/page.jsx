import React from "react";
import {
    Envelope,
    Handset,
    MapPin,
    Clock,
    Stethoscope,
} from "@gravity-ui/icons";

const Contactpage = () => {
    return (
        <main className="min-h-screen bg-[#f8fbfc]">

            {/* Hero */}
            <section className="border-b border-[#dfe8ec] bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#064b78]">
                        Get In Touch
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#12344d] sm:text-5xl">
                        Contact NovaCare
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                        Have a question or need help? Our team is here to
                        assist you with your healthcare needs.
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 sm:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

                    <div className="rounded-3xl bg-[#064b78] p-7 text-white shadow-lg sm:p-10">

                        {/* Header */}
                        <div className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                                <Stethoscope className="h-8 w-8" />
                            </div>

                            <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
                                Let's Talk
                            </h2>

                            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70">
                                Whether you need support, have a question,
                                or want to learn more about NovaCare,
                                feel free to reach out to us.
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="mt-10 grid gap-4 sm:grid-cols-2">

                            {/* Email */}
                            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                        <Envelope className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-white/50">
                                            Email
                                        </p>

                                        <p className="mt-1 text-sm font-medium">
                                            support@novacare.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                        <Handset className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-white/50">
                                            Phone
                                        </p>

                                        <p className="mt-1 text-sm font-medium">
                                            +880 1234-567890
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                        <MapPin className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-white/50">
                                            Location
                                        </p>

                                        <p className="mt-1 text-sm font-medium">
                                            Dhaka, Bangladesh
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                        <Clock className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-white/50">
                                            Working Hours
                                        </p>

                                        <p className="mt-1 text-sm font-medium">
                                            Sat - Thu, 9:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contactpage;