"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "@/image/logo.png";

import {
    ChevronDown,
    Bars,
    Xmark,
    ArrowRightFromSquare,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const Navbar = () => {
    const router = useRouter();

    const {
        data: session,
        isPending,
    } = authClient.useSession();

    const [mobileMenu, setMobileMenu] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const user = session?.user;

    // ================= DASHBOARD ROLE REDIRECT =================
    const handleDashboard = () => {
        const role = session?.user?.role;

        if (!role) {
            router.push("/signin");
            return;
        }

        if (role === "doctor") {
            router.push("/dashboard/doctor/overveiw");
        } else if (role === "patient") {
            router.push("/dashboard/patient");
        } else if (role === "admin") {
            router.push("/dashboard/admin");
        } else {
            console.error("Unknown role:", role);
        }

        // Mobile menu close
        setMobileMenu(false);
    };

    // ================= SIGN OUT =================
    const handleSignOut = async () => {
        try {
            await authClient.signOut();

            setProfileOpen(false);
            setMobileMenu(false);

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            <nav className="mx-auto flex h-[76px] max-w-[1200px] items-center">

                {/* ================= LOGO ================= */}
                <Link
                    href="/"
                    className="flex h-full w-[175px] shrink-0 items-center border-r border-gray-200 px-6"
                >
                    <Image
                        src={logo}
                        alt="Heltra"
                        width={85}
                        height={45}
                        className="h-auto w-[65px] object-contain"
                        priority
                    />
                </Link>

                {/* ================= DESKTOP NAV ================= */}
                <div className="hidden h-full flex-1 items-center justify-center lg:flex">
                    <div className="flex items-center gap-8">

                        <Link
                            href="/"
                            className="flex items-center gap-1 text-[15px] font-medium text-[#064873] hover:text-[#0875b1]"
                        >
                            Home
                            <ChevronDown className="h-3.5 w-3.5" />
                        </Link>

                        <Link
                            href="/about"
                            className="text-[15px] font-medium text-[#064873] hover:text-[#0875b1]"
                        >
                            About
                        </Link>

                        <Link
                            href="/find-doctor"
                            className="flex items-center gap-1 text-[15px] font-medium text-[#064873] hover:text-[#0875b1]"
                        >
                            Find-doctor
                            <ChevronDown className="h-3.5 w-3.5" />
                        </Link>

                        <Link
                            href="/contact"
                            className="text-[15px] font-medium text-[#064873] hover:text-[#0875b1]"
                        >
                            Contact
                        </Link>

                        {/* ================= ROLE BASED DASHBOARD ================= */}
                        <button
                            type="button"
                            onClick={handleDashboard}
                            className="text-[15px] font-medium text-[#064873] hover:text-[#0875b1]"
                        >
                            DashBoard
                        </button>
                    </div>
                </div>

                {/* ================= DESKTOP RIGHT ================= */}
                <div className="hidden h-full items-center lg:flex">

                    {/* USER */}
                    <div className="relative flex h-full items-center border-l border-r border-gray-200 px-5">

                        {isPending ? (
                            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                        ) : user ? (

                            <button
                                type="button"
                                onClick={() =>
                                    setProfileOpen((prev) => !prev)
                                }
                                className="flex items-center gap-3"
                            >

                                {/* USER IMAGE */}
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || "User"}
                                        width={44}
                                        height={44}
                                        className="h-11 w-11 rounded-full border-2 border-[#dcebf3] object-cover"
                                    />
                                ) : (
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#064873] text-sm font-bold text-white">
                                        {user.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "U"}
                                    </div>
                                )}

                                {/* NAME */}
                                <div className="hidden text-left xl:block">
                                    <p className="max-w-[120px] truncate text-sm font-semibold text-[#064873]">
                                        {user.name || "User"}
                                    </p>

                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <span>Profile</span>

                                        <ChevronDown
                                            className={`h-3 w-3 transition-transform ${
                                                profileOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </div>
                                </div>
                            </button>

                        ) : (

                            <Link
                                href="/signin"
                                className="text-sm font-semibold"
                            >
                                <Button
                                    variant="outline"
                                    className="bg-[#064873] text-white"
                                >
                                    Sign In
                                </Button>
                            </Link>

                        )}

                        {/* ================= PROFILE DROPDOWN ================= */}
                        {profileOpen && user && (
                            <div className="absolute right-3 top-[68px] w-[280px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.14)]">

                                {/* PROFILE HEADER */}
                                <div className="bg-[#f3f8fb] p-4">
                                    <div className="flex items-center gap-3">

                                        {user.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name || "User"}
                                                width={50}
                                                height={50}
                                                className="h-[50px] w-[50px] rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#064873] text-lg font-bold text-white">
                                                {user.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() || "U"}
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-[#064873]">
                                                {user.name || "User"}
                                            </p>

                                            <p className="truncate text-xs text-gray-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* DROPDOWN */}
                                <div className="p-2">

                                    <Link
                                        href="/profile"
                                        onClick={() =>
                                            setProfileOpen(false)
                                        }
                                        className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#f3f8fb]"
                                    >
                                        My Profile
                                    </Link>

                                    {/* Dashboard */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setProfileOpen(false);
                                            handleDashboard();
                                        }}
                                        className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-[#f3f8fb]"
                                    >
                                        Dashboard
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                                    >
                                        <ArrowRightFromSquare className="h-4 w-4" />

                                        Sign Out
                                    </button>

                                </div>
                            </div>
                        )}
                    </div>

                    {/* APPOINTMENT */}
                    <div className="px-3">
                        <Link
                            href="/appointment"
                            className="flex h-12 min-w-[138px] items-center justify-center rounded-md bg-[#004873] px-6 text-sm font-semibold text-white transition hover:bg-[#003957]"
                        >
                            Appointment
                        </Link>
                    </div>
                </div>

                {/* ================= MOBILE ================= */}
                <div className="ml-auto flex items-center gap-3 px-4 lg:hidden">

                    {/* USER IMAGE */}
                    {user && (
                        <button
                            type="button"
                            onClick={() =>
                                setProfileOpen((prev) => !prev)
                            }
                            className="relative"
                        >
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "User"}
                                    width={42}
                                    height={42}
                                    className="h-[42px] w-[42px] rounded-full border-2 border-[#dcebf3] object-cover"
                                />
                            ) : (
                                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#064873] text-sm font-bold text-white">
                                    {user.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>
                            )}

                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                        </button>
                    )}

                    {/* HAMBURGER */}
                    <button
                        type="button"
                        onClick={() =>
                            setMobileMenu((prev) => !prev)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2f7fa] text-[#064873]"
                    >
                        {mobileMenu ? (
                            <Xmark className="h-6 w-6" />
                        ) : (
                            <Bars className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </nav>

            {/* ================= MOBILE MENU ================= */}
            {mobileMenu && (
                <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg lg:hidden">

                    <div className="flex flex-col gap-1">

                        <Link
                            href="/"
                            onClick={() => setMobileMenu(false)}
                            className="rounded-lg px-4 py-3 font-medium text-[#064873] hover:bg-[#f3f8fb]"
                        >
                            Home
                        </Link>

                        <Link
                            href="/about"
                            onClick={() => setMobileMenu(false)}
                            className="rounded-lg px-4 py-3 font-medium text-[#064873] hover:bg-[#f3f8fb]"
                        >
                            About
                        </Link>

                        <Link
                            href="/find-doctor"
                            onClick={() => setMobileMenu(false)}
                            className="rounded-lg px-4 py-3 font-medium text-[#064873] hover:bg-[#f3f8fb]"
                        >
                            Find-doctor
                        </Link>

                        <Link
                            href="/contact"
                            onClick={() => setMobileMenu(false)}
                            className="rounded-lg px-4 py-3 font-medium text-[#064873] hover:bg-[#f3f8fb]"
                        >
                            Contact
                        </Link>

                        {/* ================= MOBILE DASHBOARD ================= */}
                        <button
                            type="button"
                            onClick={handleDashboard}
                            className="rounded-lg px-4 py-3 text-left font-medium text-[#064873] hover:bg-[#f3f8fb]"
                        >
                            DashBoard
                        </button>

                        <Link
                            href="/appointment"
                            onClick={() => setMobileMenu(false)}
                            className="mt-3 flex h-12 items-center justify-center rounded-lg bg-[#004873] font-semibold text-white"
                        >
                            Appointment
                        </Link>

                    </div>
                </div>
            )}

            {/* ================= MOBILE PROFILE DROPDOWN ================= */}
            {profileOpen && user && (
                <div className="absolute right-4 top-[68px] z-[60] w-[280px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl lg:hidden">

                    <div className="bg-[#f3f8fb] p-4">
                        <div className="flex items-center gap-3">

                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "User"}
                                    width={50}
                                    height={50}
                                    className="h-[50px] w-[50px] rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#064873] text-lg font-bold text-white">
                                    {user.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>
                            )}

                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-[#064873]">
                                    {user.name || "User"}
                                </p>

                                <p className="truncate text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-2">

                        <Link
                            href="/profile"
                            onClick={() => setProfileOpen(false)}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#f3f8fb]"
                        >
                            My Profile
                        </Link>

                        {/* Dashboard */}
                        <button
                            type="button"
                            onClick={() => {
                                setProfileOpen(false);
                                handleDashboard();
                            }}
                            className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-[#f3f8fb]"
                        >
                            Dashboard
                        </button>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                        >
                            <ArrowRightFromSquare className="h-4 w-4" />

                            Sign Out
                        </button>

                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;