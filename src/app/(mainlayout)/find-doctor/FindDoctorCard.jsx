"use client";

import { useMemo, useState } from "react";
import { Briefcase, CircleDollar, Factory, GraduationCap, Magnifier, Stethoscope } from "@gravity-ui/icons";


const FindDoctorCard = ({ doctors }) => {



    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] = useState("");

    // ==========================================
    // Specialization List
    // ==========================================

    const specializations = useMemo(() => {
        return [
            ...new Set(
                doctors
                    ?.map((doctor) => doctor.specialization)
                    .filter(Boolean)
            ),
        ];
    }, [doctors]);

    // ==========================================
    // Filter Doctors
    // ==========================================

    const filteredDoctors = useMemo(() => {
        return doctors?.filter((doctor) => {
            const searchValue = search.toLowerCase().trim();

            const matchesSearch =
                doctor.doctorName
                    ?.toLowerCase()
                    .includes(searchValue) ||
                doctor.specialization
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesSpecialization =
                !specialization ||
                doctor.specialization === specialization;

            return matchesSearch && matchesSpecialization;
        });
    }, [doctors, search, specialization]);

    return (
        <div className="min-h-screen bg-[#f8fbfc]">
            {/* ==========================================
                HERO / SEARCH HEADER
            ========================================== */}

            <section className="border-b border-[#e5edf1] bg-white">
                <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5f8]">
                            <Stethoscope className="h-6 w-6 text-[#064b78]" />
                        </div>

                        <p className="text-3xl font-bold tracking-tight text-[#12344d] sm:text-4xl lg:text-5xl">
                            Find Your Doctor
                        </p>
                        {/* 
                        <h1 className="text-3xl font-bold tracking-tight text-[#12344d] sm:text-4xl lg:text-5xl">
                            Advanced Doctor Search
                        </h1> */}

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                            Search for the right doctor by name or
                            specialization and find a healthcare
                            professional that matches your needs.
                        </p>
                    </div>

                    {/* ==========================================
                        SEARCH AREA
                    ========================================== */}

                    <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-[#dce7ec] bg-[#f8fbfc] p-3 shadow-sm sm:p-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_260px]">
                            {/* Search */}
                            <div className="relative">
                                <Magnifier className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search by doctor name or specialization..."
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#064b78] focus:ring-2 focus:ring-[#064b78]/10"
                                />
                            </div>

                            {/* Specialization */}
                            <div className="relative">
                                <select
                                    value={specialization}
                                    onChange={(e) =>
                                        setSpecialization(e.target.value)
                                    }
                                    className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-[#064b78] focus:ring-2 focus:ring-[#064b78]/10"
                                >
                                    <option value="">
                                        All Specializations
                                    </option>

                                    {specializations.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Search info */}
                        <div className="mt-3 flex flex-col gap-1 px-1 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                            <span>
                                Search doctors by name or
                                specialization
                            </span>

                            <span className="font-medium text-[#064b78]">
                                {filteredDoctors?.length || 0} doctors found
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                DOCTOR LIST
            ========================================== */}

            <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {filteredDoctors?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredDoctors.map((doctor) => (
                            <DoctorCard
                                key={doctor._id}
                                doctor={doctor}
                            />
                        ))}
                    </div>
                ) : (
                    /* ==========================================
                        EMPTY STATE
                    ========================================== */

                    <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef5f8]">
                                <Stethoscope className="h-6 w-6 text-[#064b78]" />
                            </div>

                            <h2 className="text-lg font-semibold text-gray-800">
                                No doctors found
                            </h2>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                We couldn't find any doctor matching
                                your search. Try another name or
                                specialization.
                            </p>

                            {(search || specialization) && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setSpecialization("");
                                    }}
                                    className="mt-5 rounded-xl bg-[#064b78] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#053d61]"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

/* ============================================================
   DOCTOR CARD
============================================================ */

const DoctorCard = ({ doctor }) => {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#dfe8ec] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-52 w-full overflow-hidden bg-[#eef5f8] sm:h-56">
                {doctor.profileImage ? (
                    <img src={doctor.profileImage} alt={doctor.doctorName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />)
                    : (
                        <div className="flex h-full w-full items-center justify-center">
                            <Stethoscope className="h-14 w-14 text-[#064b78]" />
                        </div>)}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-4 top-4">
                    <span className="inline-flex rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#064b78] shadow-sm backdrop-blur"> {doctor.specialization || "Specialist"} </span>
                </div>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div>
                    <h2 className="line-clamp-1 text-xl font-bold text-[#12344d]"> {doctor.doctorName || "Doctor Name"}
                    </h2>
                    <p className="mt-1 line-clamp-1 text-sm text-gray-500"> {doctor.hospitalName || "Hospital not available"} </p>
                </div>
                <div className="mt-5 space-y-4"> {/* Hospital */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f6f8]">
                            <Factory className="h-4 w-4 text-[#064b78]" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400"> Hospital </p>
                            <p className="mt-0.5 line-clamp-2 text-sm font-medium text-gray-700"> {doctor.hospitalName || "Hospital not available"} </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f6f8]">
                            <GraduationCap className="h-4 w-4 text-[#064b78]" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400"> Qualification </p>
                            <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-5 text-gray-700"> {doctor.qualifications || "Qualification not available"} </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5"> {/* Experience */}
                    <div className="rounded-xl bg-[#f8fbfc] p-3.5">
                        <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-[#064b78]" />
                            <span className="text-xs text-gray-500"> Experience </span>
                        </div>
                        <p className="mt-1.5 text-base font-bold text-[#12344d]"> {doctor.experience || 0} Years </p>
                    </div>
                    <div className="rounded-xl bg-[#f8fbfc] p-3.5">
                        <div className="flex items-center gap-2">
                            <CircleDollar className="h-4 w-4 text-[#064b78]" />
                            <span className="text-xs text-gray-500"> Consultation </span>
                        </div>
                        <p className="mt-1.5 text-base font-bold text-[#12344d]"> {doctor.consultationFee || 0} </p>
                    </div>
                </div>
                <div className="mt-auto pt-6">
                    <button type="button" className="flex w-full items-center justify-center rounded-xl bg-[#064b78] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#053d61] active:scale-[0.98]" > View Doctor </button>
                </div>
            </div>
        </article>
    );
};

export default FindDoctorCard;