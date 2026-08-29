
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Person,
    Calendar,
    Stethoscope,
    FileText,
    Paperclip,
    CloudGear,
    House,
    Persons,
    ArrowRightFromSquare,
    Bars,
    Xmark,
    Factory,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

// =====================================================
// DOCTOR MENU
// =====================================================

const doctorMenu = [
    {
        key: "overview",
        label: "Overview",
        href: "/dashboard/doctor",
        icon: House,
    },
    {
        key: "schedule",
        label: "Manage Schedule",
        href: "/dashboard/doctor/schedule",
        icon: Calendar,
    },
    {
        key: "appointments",
        label: "Appointment Requests",
        href: "/dashboard/doctor/appointments",
        icon: Paperclip,
    },
    {
        key: "prescriptions",
        label: "Prescription Management",
        href: "/dashboard/doctor/prescriptions",
        icon: FileText,
    },
    {
        key: "profile",
        label: "Profile Management",
        href: "/dashboard/doctor/profile",
        icon: Person,
    },
];

// =====================================================
// PATIENT MENU
// =====================================================

const patientMenu = [
    {
        key: "overview",
        label: "Overview",
        href: "/dashboard/patient",
        icon: House,
    },
    {
        key: "doctors",
        label: "Find Doctors",
        href: "/dashboard/patient/doctors",
        icon: Stethoscope,
    },
    {
        key: "appointments",
        label: "My Appointments",
        href: "/dashboard/patient/appointments",
        icon: Calendar,
    },
    {
        key: "prescriptions",
        label: "My Prescriptions",
        href: "/dashboard/patient/prescriptions",
        icon: FileText,
    },
    {
        key: "profile",
        label: "Profile Management",
        href: "/dashboard/patient/profile",
        icon: Person,
    },
];

// =====================================================
// ADMIN MENU
// =====================================================

const adminMenu = [
    {
        key: "overview",
        label: "Overview",
        href: "/dashboard/admin",
        icon: House,
    },
    {
        key: "users",
        label: "Manage Users",
        href: "/dashboard/admin/users",
        icon: Persons,
    },
    {
        key: "doctors",
        label: "Manage Doctors",
        href: "/dashboard/admin/doctors",
        icon: Stethoscope,
    },
    {
        key: "appointments",
        label: "Appointments",
        href: "/dashboard/admin/appointments",
        icon: Calendar,
    },
    {
        key: "hospital",
        label: "Hospital Management",
        href: "/dashboard/admin/hospital",
        icon: Factory,
    },
    {
        key: "settings",
        label: "Settings",
        href: "/dashboard/admin/settings",
        icon: CloudGear,
    },
];

// =====================================================
// DASHBOARD LAYOUT
// =====================================================

const DashboardLayout = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    // =================================================
    // GET SESSION
    // =================================================

    useEffect(() => {
        const getSession = async () => {
            try {
                const { data, error } =
                    await authClient.getSession();

                if (error || !data?.user) {
                    router.replace("/auth/signin");
                    return;
                }

                setSession(data);
            } catch (error) {
                console.error(
                    "Failed to get session:",
                    error
                );

                router.replace("/auth/signin");
            } finally {
                setLoading(false);
            }
        };

        getSession();
    }, [router]);

    // =================================================
    // LOADING
    // =================================================

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fbfc]">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#064b78]" />

                    <p className="text-sm text-gray-500">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    // =================================================
    // USER
    // =================================================

    const user = session?.user;

    const role = user?.role?.toLowerCase();

    // =================================================
    // ROLE BASED MENU
    // =================================================

    let menu = [];

    if (role === "doctor") {
        menu = doctorMenu;
    } else if (role === "patient") {
        menu = patientMenu;
    } else if (role === "admin") {
        menu = adminMenu;
    }

    // =================================================
    // DASHBOARD PATH
    // =================================================

    const dashboardPath = {
        doctor: "/dashboard/doctor",
        patient: "/dashboard/patient",
        admin: "/dashboard/admin",
    };

    // =================================================
    // INVALID ROLE
    // =================================================

    if (!dashboardPath[role]) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fbfc]">
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-[#064b78]">
                        Invalid Role
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Your account does not have a valid
                        dashboard role.
                    </p>
                </div>
            </div>
        );
    }

    // =================================================
    // LOGOUT
    // =================================================

    const handleLogout = async () => {
        try {
            await authClient.signOut();

            router.replace("/auth/signin");
            router.refresh();
        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );
        }
    };

    // =================================================
    // ACTIVE LINK
    // =================================================

    const isActive = (href) => {
        if (href === dashboardPath[role]) {
            return pathname === href;
        }

        return pathname.startsWith(href);
    };

    // =================================================
    // SIDEBAR
    // =================================================

    const Sidebar = () => (
        <aside
            className={`
                fixed
                inset-y-0
                left-0
                z-50
                flex
                w-64
                flex-col
                border-r
                border-gray-200
                bg-[#f8fbfc]

                transform
                transition-transform
                duration-300
                ease-in-out

                ${
                    mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }

                lg:translate-x-0
            `}
        >

            {/* =========================================
                LOGO
            ========================================= */}

            <div className="flex h-[76px] shrink-0 items-center border-b border-gray-200 px-5">

                <Link
                    href="/"
                    className="flex items-center gap-2"
                >

                    <div className="flex h-9 w-9 items-center justify-center text-3xl font-bold text-[#064b78]">
                        +
                    </div>

                    <span className="text-[23px] font-semibold tracking-tight text-[#064b78]">
                        Heltro
                    </span>

                </Link>

                {/* Mobile Close */}

                <button
                    type="button"
                    onClick={() =>
                        setMobileOpen(false)
                    }
                    className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white hover:text-[#064b78] lg:hidden"
                    aria-label="Close sidebar"
                >
                    <Xmark className="h-5 w-5" />
                </button>

            </div>

            {/* =========================================
                USER INFO
            ========================================= */}

            <div className="shrink-0 border-b border-gray-200 p-4">

                <div className="flex items-center gap-3">

                    {/* Avatar */}

                    {user?.image ? (
                        <img
                            src={user.image}
                            alt={
                                user.name ||
                                "User"
                            }
                            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white"
                        />
                    ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e7f0f5] text-[#064b78]">
                            <Person className="h-5 w-5" />
                        </div>
                    )}

                    {/* Name / Role */}

                    <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-[#064b78]">
                            {user?.name ||
                                "User"}
                        </p>

                        <p className="truncate text-xs capitalize text-gray-500">
                            {role}
                        </p>

                    </div>

                </div>

            </div>

            {/* =========================================
                MENU
            ========================================= */}

            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5">

                <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {role} dashboard
                </p>

                <nav className="flex flex-col gap-1">

                    {menu.map((item) => {

                        const Icon =
                            item.icon;

                        const active =
                            isActive(
                                item.href
                            );

                        return (
                            <Link
                                key={
                                    item.key
                                }
                                href={
                                    item.href
                                }
                                onClick={() =>
                                    setMobileOpen(
                                        false
                                    )
                                }
                                className={`
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    rounded-lg
                                    px-3
                                    py-3
                                    text-sm
                                    font-medium
                                    transition

                                    ${
                                        active
                                            ? "bg-[#064b78] text-white shadow-sm"
                                            : "text-gray-600 hover:bg-white hover:text-[#064b78]"
                                    }
                                `}
                            >

                                <Icon
                                    className={`
                                        h-[18px]
                                        w-[18px]
                                        shrink-0

                                        ${
                                            active
                                                ? "text-white"
                                                : "text-gray-400 group-hover:text-[#064b78]"
                                        }
                                    `}
                                />

                                <span>
                                    {
                                        item.label
                                    }
                                </span>

                            </Link>
                        );
                    })}

                </nav>

            </div>

            {/* =========================================
                LOGOUT
            ========================================= */}

            <div className="shrink-0 border-t border-gray-200 p-3">

                <button
                    type="button"
                    onClick={
                        handleLogout
                    }
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-red-600"
                >

                    <ArrowRightFromSquare className="h-[18px] w-[18px]" />

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>
    );

    // =================================================
    // MAIN
    // =================================================

    return (
        <div className="h-screen overflow-hidden bg-[#f8fbfc]">

            {/* =========================================
                SIDEBAR
            ========================================= */}

            <Sidebar />

            {/* =========================================
                MOBILE OVERLAY
            ========================================= */}

            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() =>
                        setMobileOpen(false)
                    }
                    className="fixed inset-0 z-40 bg-black/20 lg:hidden"
                />
            )}

            {/* =========================================
                RIGHT SIDE
            ========================================= */}

            <div className="flex h-screen min-w-0 flex-col lg:ml-64">

                {/* =====================================
                    MOBILE TOPBAR
                ===================================== */}

                <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-gray-200 bg-[#f8fbfc]/95 px-4 backdrop-blur lg:hidden">

                    {/* Menu Button */}

                    <button
                        type="button"
                        onClick={() =>
                            setMobileOpen(true)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-[#064b78] transition hover:bg-white"
                        aria-label="Open sidebar"
                    >
                        <Bars className="h-5 w-5" />
                    </button>

                    {/* Mobile User */}

                    <div className="flex items-center">

                        {user?.image ? (
                            <img
                                src={
                                    user.image
                                }
                                alt={
                                    user.name ||
                                    "User"
                                }
                                className="h-9 w-9 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7f0f5] text-[#064b78]">
                                <Person className="h-4 w-4" />
                            </div>
                        )}

                    </div>

                </header>

                {/* =====================================
                    PAGE CONTENT
                ===================================== */}

                <main className="min-h-0 flex-1 overflow-y-auto">

                    <div className="p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>

                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;

