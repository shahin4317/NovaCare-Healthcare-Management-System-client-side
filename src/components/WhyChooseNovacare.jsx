import React from "react";
import {
    Stethoscope,
    ShieldCheck,
    Clock,
    Heart,
    Calendar,
    CircleCheck,
} from "@gravity-ui/icons";

const benefits = [
    {
        title: "Expert Doctors",
        description:
            "Connect with experienced and qualified doctors from different medical specialties.",
        icon: Stethoscope,
    },
    {
        title: "Trusted Healthcare",
        description:
            "Get reliable healthcare services through a secure and trusted medical platform.",
        icon: ShieldCheck,
    },
    {
        title: "Easy Appointment",
        description:
            "Book appointments with your preferred doctor quickly and conveniently.",
        icon: Calendar,
    },
    {
        title: "Save Your Time",
        description:
            "Reduce waiting time and manage your healthcare appointments with ease.",
        icon: Clock,
    },
    {
        title: "Patient-Centered Care",
        description:
            "We focus on making healthcare simple, accessible and comfortable for every patient.",
        icon: Heart,
    },
    {
        title: "Quality Service",
        description:
            "Experience a smooth healthcare journey with professional and quality services.",
        icon: CircleCheck,
    },
];

const WhyChooseNovacare = () => {
    return (
        <section className="bg-[#f8fbfc] py-16 sm:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#064b78]">
                        Why NovaCare
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#12344d] sm:text-4xl">
                        Why Choose NovaCare?
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
                        We make healthcare easier, faster and more accessible
                        by connecting patients with trusted medical professionals.
                    </p>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <article
                                key={benefit.title}
                                className="group rounded-2xl border border-[#dfe8ec] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#064b78]/20 hover:shadow-lg sm:p-7"
                            >
                                {/* Icon */}
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5f8] transition-all duration-300 group-hover:bg-[#064b78]">
                                    <Icon className="h-7 w-7 text-[#064b78] transition-colors duration-300 group-hover:text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="mt-5 text-lg font-bold text-[#12344d]">
                                    {benefit.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    {benefit.description}
                                </p>

                                {/* Bottom accent */}
                                <div className="mt-5 h-1 w-8 rounded-full bg-[#064b78] transition-all duration-300 group-hover:w-14" />
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseNovacare;