"use client";

import Link from "next/link";
import { ChevronRight, CircleCheck, Envelope, LocationArrow, Smartphone } from "@gravity-ui/icons";

const Footer = () => {
    const quickLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Find Doctors",
            href: "/find-doctor",
        },
        {
            name: "About Us",
            href: "/about",
        },
        {
            name: "Contact Us",
            href: "/contact",
        },
    ];

    const socialLinks = [
        {
            name: "Facebook",
            href: "#",
        },
        {
            name: "Instagram",
            href: "#",
        },
        {
            name: "LinkedIn",
            href: "#",
        },
        {
            name: "Twitter",
            href: "#",
        },
    ];

    return (
        <footer className="bg-[#071C1B] text-white">

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">


                    {/* Brand */}
                    <div className="lg:col-span-5">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3"
                        >

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#36C6A3] shadow-lg shadow-[#36C6A3]/20 transition-transform duration-300 group-hover:rotate-6">

                                <span className="text-xl font-black text-[#071C1B]">
                                    N
                                </span>

                            </div>

                            <div>
                                <h2 className="text-xl font-bold tracking-tight">
                                   Nova
                                    <span className="text-[#36C6A3]">
                                        Care
                                    </span>
                                </h2>

                                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
                                    Better care. Better life.
                                </p>
                            </div>

                        </Link>


                        {/* Description */}
                        <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
                            Connecting patients with trusted healthcare
                            professionals through a simple, secure and
                            reliable healthcare experience.
                        </p>


                        {/* Trust Badge */}
                        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5">

                            <CircleCheck
                                width={16}
                                height={16}
                                className="text-[#36C6A3]"
                            />

                            <span className="text-xs font-medium text-white/70">
                                Trusted healthcare platform
                            </span>

                        </div>

                    </div>


                    {/* Quick Links */}
                    <div className="lg:col-span-2">

                        <h3 className="text-sm font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="mt-6 space-y-3">

                            {quickLinks.map((link) => (
                                <li key={link.name}>

                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-1.5 text-sm text-white/50 transition-colors duration-200 hover:text-[#36C6A3]"
                                    >

                                        <ChevronRight
                                            width={13}
                                            height={13}
                                            className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                                        />

                                        <span>
                                            {link.name}
                                        </span>

                                    </Link>

                                </li>
                            ))}

                        </ul>

                    </div>


                    {/* Contact */}
                    <div className="lg:col-span-3">

                        <h3 className="text-sm font-semibold text-white">
                            Contact Information
                        </h3>

                        <div className="mt-6 space-y-5">

                            {/* Location */}
                            <div className="flex gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5">
                                    <LocationArrow
                                        width={17}
                                        height={17}
                                        className="text-[#36C6A3]"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-white/35">
                                        Visit us
                                    </p>

                                    <p className="mt-1 text-sm leading-5 text-white/65">
                                        123 Healthcare Avenue,
                                        <br />
                                        Dhaka, Bangladesh
                                    </p>
                                </div>

                            </div>


                            {/* Email */}
                            <div className="flex gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5">
                                    <Envelope
                                        width={17}
                                        height={17}
                                        className="text-[#36C6A3]"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-white/35">
                                        Email us
                                    </p>

                                    <p className="mt-1 text-sm text-white/65">
                                        support@medicareconnect.com
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Emergency */}
                    <div className="lg:col-span-2">

                        <div className="relative overflow-hidden rounded-3xl border border-red-400/10 bg-red-400/[0.06] p-5">

                            {/* Decorative Circle */}
                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-400/10" />

                            <div className="relative">

                                <div className="flex items-center gap-2">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-400/10">

                                        <Smartphone
                                            width={17}
                                            height={17}
                                            className="text-red-300"
                                        />

                                    </div>

                                    <span className="text-xs font-semibold uppercase tracking-wider text-red-200">
                                        Emergency
                                    </span>

                                </div>


                                <p className="mt-4 text-xs text-white/40">
                                    Need urgent medical help?
                                </p>


                                <a
                                    href="tel:999"
                                    className="mt-1 block text-2xl font-bold tracking-tight text-white transition-colors hover:text-red-200"
                                >
                                    999
                                </a>


                                <p className="mt-1 text-[11px] text-white/35">
                                    Available 24/7
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Bottom Area */}
                <div className="mt-14 border-t border-white/10 pt-7">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">


                        {/* Copyright */}
                        <p className="text-xs text-white/35">
                            © {new Date().getFullYear()} MediCare Connect.
                            All rights reserved.
                        </p>


                        {/* Social Links */}
                        <div className="flex items-center gap-2">

                            <span className="mr-2 text-xs text-white/30">
                                Follow us
                            </span>

                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[10px] font-bold text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-[#36C6A3]/30 hover:bg-[#36C6A3]/10 hover:text-[#36C6A3]"
                                >
                                    {social.name.charAt(0)}
                                </Link>
                            ))}

                        </div>

                    </div>

                </div>

            </div>


            {/* Bottom Accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#36C6A3] to-transparent opacity-60" />

        </footer>
    );
};

export default Footer;