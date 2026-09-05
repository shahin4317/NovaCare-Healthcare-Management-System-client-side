import {
    Briefcase,
    CircleDollar,
    Factory,
    GraduationCap,
    Stethoscope,
    CircleCheck,
    CircleXmark,
} from "@gravity-ui/icons";
import Link from "next/link";
import { findDoctor } from "@/lib/api/doctors/data";

const FeaturedDoctors = async () => {
    // Fetch doctors from API
    const doctors = await findDoctor();

    // Only first 3 doctors
    const featuredDoctors = doctors?.slice(0, 3);

    console.log(featuredDoctors, "Featured Doctors");

    return (
        <section className="bg-[#f8fbfc] py-16 sm:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-10 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#064b78]">
                        Our Medical Experts
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#12344d] sm:text-4xl">
                        Featured Doctors
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                        Meet our experienced doctors and find the right
                        healthcare professional for your needs.
                    </p>
                </div>

                {/* Doctor Cards */}
                {featuredDoctors?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredDoctors.map((doctor) => (
                            <DoctorCard
                                key={doctor._id}
                                doctor={doctor}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
                        <div className="text-center">
                            <Stethoscope className="mx-auto h-12 w-12 text-[#064b78]" />

                            <h3 className="mt-4 text-lg font-semibold text-[#12344d]">
                                No doctors available
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Featured doctors will appear here.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};


/* ============================================================
   DOCTOR CARD
============================================================ */

const DoctorCard = ({ doctor }) => {

    // Active = Verified
    const isVerified = doctor?.status === "Active";

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#dfe8ec] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Doctor Image */}
            <div className="relative h-52 w-full overflow-hidden bg-[#eef5f8] sm:h-56">

                {doctor?.profileImage ? (
                    <img
                        src={doctor.profileImage}
                        alt={doctor.doctorName || "Doctor"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Stethoscope className="h-14 w-14 text-[#064b78]" />
                    </div>
                )}

                {/* Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Specialization */}
                <div className="absolute left-4 top-4">
                    <span className="inline-flex rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#064b78] shadow-sm backdrop-blur">
                        {doctor?.specialization || "Specialist"}
                    </span>
                </div>

                {/* Verification Badge */}
                <div className="absolute right-4 top-4">
                    {isVerified ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-green-600 shadow-sm backdrop-blur">
                            <CircleCheck className="h-4 w-4" />
                            Verified
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-red-500 shadow-sm backdrop-blur">
                            <CircleXmark className="h-4 w-4" />
                            Not Verified
                        </span>
                    )}
                </div>
            </div>


            {/* Card Content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">

                {/* Name */}
                <div>
                    <h2 className="line-clamp-1 text-xl font-bold text-[#12344d]">
                        {doctor?.doctorName || "Doctor Name"}
                    </h2>

                    <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                        {doctor?.hospitalName ||
                            "Hospital not available"}
                    </p>
                </div>


                {/* Doctor Information */}
                <div className="mt-5 space-y-4">

                    {/* Hospital */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f6f8]">
                            <Factory className="h-4 w-4 text-[#064b78]" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                Hospital
                            </p>

                            <p className="mt-0.5 line-clamp-2 text-sm font-medium text-gray-700">
                                {doctor?.hospitalName ||
                                    "Hospital not available"}
                            </p>
                        </div>
                    </div>


                    {/* Qualification */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f6f8]">
                            <GraduationCap className="h-4 w-4 text-[#064b78]" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                Qualification
                            </p>

                            <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-5 text-gray-700">
                                {doctor?.qualifications ||
                                    "Qualification not available"}
                            </p>
                        </div>
                    </div>
                </div>


                {/* Experience + Consultation */}
                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">

                    {/* Experience */}
                    <div className="rounded-xl bg-[#f8fbfc] p-3.5">
                        <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-[#064b78]" />

                            <span className="text-xs text-gray-500">
                                Experience
                            </span>
                        </div>

                        <p className="mt-1.5 text-base font-bold text-[#12344d]">
                            {doctor?.experience || 0} Years
                        </p>
                    </div>


                    {/* Consultation */}
                    <div className="rounded-xl bg-[#f8fbfc] p-3.5">
                        <div className="flex items-center gap-2">
                            <CircleDollar className="h-4 w-4 text-[#064b78]" />

                            <span className="text-xs text-gray-500">
                                Consultation
                            </span>
                        </div>

                        <p className="mt-1.5 text-base font-bold text-[#12344d]">
                            ৳{doctor?.consultationFee || 0}
                        </p>
                    </div>
                </div>


                {/* View Details */}
                <div className="mt-auto pt-6">
                    <Link
                        href={`/find-doctor/${doctor?._id}`}
                        className="flex w-full items-center justify-center rounded-xl bg-[#064b78] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#053d61] active:scale-[0.98]"
                    >
                        View Details
                    </Link>
                </div>

            </div>
        </article>
    );
};

export default FeaturedDoctors;