
"use client";

import {
    Calendar,
    Clock,
    CircleCheck,
    CircleXmark,
    Stethoscope,
    ArrowUpRight,
    Heart,
    CreditCard,
} from "@gravity-ui/icons";

const PatientOverviewCards = ({ appointments = [] }) => {

    console.log("Appointments:", appointments);


    // ================= Dynamic Counts =================

    // Pending + Confirmed = Upcoming
    const upcomingAppointments = appointments.filter(
        (appointment) =>
            appointment.appointmentStatus === "pending" ||
            appointment.appointmentStatus === "confirmed"
    );


    // Completed appointments
    const appointmentHistory = appointments.filter(
        (appointment) =>
            appointment.appointmentStatus === "completed"
    );


    // Total paid amount
    const totalPayments = appointments.reduce(
        (total, appointment) => {
            if (appointment.paymentStatus === "paid") {
                return total + Number(appointment.paymentAmount || 0);
            }

            return total;
        },
        0
    );


    // Stripe amount is in cents
    const totalPaymentAmount = totalPayments / 100;


    // Favorite doctors
    // Later backend/API থেকে dynamic হবে
    const favoriteDoctors = 0;


    // ================= Overview Cards =================

    const overviewCards = [
        {
            title: "Upcoming Appointments",
            value: upcomingAppointments.length,
            description: "Appointments scheduled",
            icon: Calendar,
        },
        {
            title: "Appointment History",
            value: appointmentHistory.length,
            description: "Completed appointments",
            icon: Clock,
        },
        {
            title: "Total Payments",
            value: `$${totalPaymentAmount.toFixed(2)}`,
            description: "Total amount paid",
            icon: CreditCard,
        },
        {
            title: "Favorite Doctors",
            value: favoriteDoctors,
            description: "Doctors you follow",
            icon: Heart,
        },
    ];


    // ================= Status Style =================

    const getStatusStyle = (status) => {

        if (status === "confirmed") {
            return {
                className:
                    "bg-emerald-50 text-emerald-600 border border-emerald-100",
                icon: <CircleCheck size={14} />,
            };
        }


        if (status === "pending") {
            return {
                className:
                    "bg-amber-50 text-amber-600 border border-amber-100",
                icon: <Clock size={14} />,
            };
        }


        if (status === "cancelled") {
            return {
                className:
                    "bg-red-50 text-red-600 border border-red-100",
                icon: <CircleXmark size={14} />,
            };
        }


        if (status === "completed") {
            return {
                className:
                    "bg-blue-50 text-blue-600 border border-blue-100",
                icon: <CircleCheck size={14} />,
            };
        }


        return {
            className:
                "bg-slate-50 text-slate-500 border border-slate-100",
            icon: null,
        };
    };


    return (
        <div className="space-y-6">


            {/* ================= Overview Cards ================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {overviewCards.map((card, index) => {

                    const Icon = card.icon;

                    return (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >

                            <div className="flex items-start justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF5FF] text-[#0074D4]">
                                    <Icon size={21} />
                                </div>


                                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#0074D4]">
                               
                                </button>

                            </div>


                            <div className="mt-5">

                                <p className="text-sm font-medium text-slate-500">
                                    {card.title}
                                </p>


                                <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                                    {card.value}
                                </h3>


                                <p className="mt-1 text-xs text-slate-400">
                                    {card.description}
                                </p>

                            </div>


                            <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-[#EAF5FF] opacity-60 transition-all duration-300 group-hover:scale-150" />

                        </div>
                    );
                })}

            </div>


            {/* ================= My Appointments ================= */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">


                {/* Header */}

                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF5FF] text-[#0074D4]">
                            <Stethoscope size={19} />
                        </div>


                        <div>

                            <h2 className="text-lg font-bold text-slate-900">
                                My Appointments
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Your upcoming doctor appointments
                            </p>

                        </div>

                    </div>


                    <div className="flex items-center gap-2">

                        <span className="rounded-full bg-[#EAF5FF] px-3 py-1.5 text-xs font-semibold text-[#0074D4]">
                            {appointments.length} Appointments
                        </span>


                        <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-[#0074D4] transition hover:bg-[#EAF5FF]">
                            View All
                            <ArrowUpRight size={15} />
                        </button>

                    </div>

                </div>


                {/* Table Header */}

                <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 bg-slate-50/70 px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 lg:grid">

                    <span>Doctor</span>

                    <span>Date</span>

                    <span>Time</span>

                    <span>Status</span>

                    <span></span>

                </div>


                {/* Appointment List */}

                <div className="divide-y divide-slate-100">

                    {appointments.length > 0 ? (

                        appointments.map((appointment) => {

                            const status = getStatusStyle(
                                appointment.appointmentStatus
                            );


                            return (
                                <div
                                    key={appointment._id}
                                    className="grid gap-4 px-5 py-5 transition hover:bg-slate-50/60 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] lg:items-center lg:gap-4 lg:px-6"
                                >


                                    {/* Doctor */}

                                    <div className="flex min-w-0 items-center gap-3">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5FF] text-[#0074D4]">
                                            <Stethoscope size={19} />
                                        </div>


                                        <div className="min-w-0">

                                            <h3 className="truncate text-sm font-bold text-slate-900">
                                                {appointment.doctorName}
                                            </h3>


                                            <p className="mt-0.5 text-xs text-slate-500">
                                                Doctor
                                            </p>

                                        </div>

                                    </div>


                                    {/* Date */}

                                    <div className="flex items-center gap-2">

                                        <Calendar
                                            size={16}
                                            className="text-slate-400"
                                        />


                                        <div>

                                            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                                                Date
                                            </p>


                                            <p className="text-sm font-semibold text-slate-700">
                                                {appointment.appointmentDate}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Time */}

                                    <div className="flex items-center gap-2">

                                        <Clock
                                            size={16}
                                            className="text-slate-400"
                                        />


                                        <div>

                                            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                                                Time
                                            </p>


                                            <p className="text-sm font-semibold text-slate-700">
                                                {appointment.appointmentTime}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Status */}

                                    <div>

                                        <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-400 lg:hidden">
                                            Status
                                        </p>


                                        <div
                                            className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
                                        >

                                            {status.icon}

                                            <span className="capitalize">
                                                {appointment.appointmentStatus}
                                            </span>

                                        </div>

                                    </div>


                                    {/* Action */}

                                    <button className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#EAF5FF] hover:text-[#0074D4] lg:flex">

                                      

                                    </button>

                                </div>
                            );
                        })

                    ) : (

                        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                                <Calendar size={25} />
                            </div>


                            <h3 className="mt-4 text-sm font-semibold text-slate-900">
                                No appointments yet
                            </h3>


                            <p className="mt-1 max-w-sm text-xs text-slate-500">
                                You don't have any appointments booked yet.
                            </p>

                        </div>

                    )}

                </div>

            </section>

        </div>
    );
};

export default PatientOverviewCards;

