import DoctorAppointment from "@/components/DoctorAppointment";
import { getDoctorDetails } from "@/lib/api/doctors/data";


const Doctordetailspage = async ({ params }) => {
    const { id } = await params;

    const result = await getDoctorDetails(id);

    console.log("Doctor Details:", result);

    if (!result) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#f8fbfc] px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#12344d]">
                        Doctor Not Found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        We couldn't find the doctor you're looking for.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f8fbfc]">
            <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

                {/* ================================
                    PAGE HEADER
                ================================= */}

                <div className="mb-7">
                    <p className="text-sm font-semibold text-[#064b78]">
                        Doctor Profile
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#12344d] sm:text-3xl">
                        Doctor Details & Appointment
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                        View doctor information and book an appointment
                        according to their available schedule.
                    </p>
                </div>


                {/* ================================
                    DOCTOR DETAILS CARD
                ================================= */}

                <section className="overflow-hidden rounded-3xl border border-[#dce7ec] bg-white shadow-sm">

                    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">

                        {/* ============================
                            IMAGE
                        ============================= */}

                        <div className="relative h-[300px] overflow-hidden bg-[#eef5f8] sm:h-[380px] lg:h-full lg:min-h-[420px]">

                            {result.profileImage ? (
                                <img
                                    src={result.profileImage}
                                    alt={result.doctorName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <span className="text-gray-400">
                                        No Image
                                    </span>
                                </div>
                            )}

                            {/* Overlay */}

                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                            {/* Specialization */}

                            <div className="absolute bottom-5 left-5">
                                <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#064b78] shadow-sm">
                                    {result.specialization}
                                </span>
                            </div>

                        </div>


                        {/* ============================
                            DETAILS
                        ============================= */}

                        <div className="flex flex-col p-6 sm:p-8">

                            <div>
                                <h2 className="text-2xl font-bold text-[#12344d] sm:text-3xl">
                                    {result.doctorName}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {result.hospitalName}
                                </p>
                            </div>


                            {/* Details Grid */}

                            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

                                {/* Specialization */}

                                <div className="rounded-xl bg-[#f8fbfc] p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Specialization
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[#12344d]">
                                        {result.specialization || "N/A"}
                                    </p>
                                </div>


                                {/* Experience */}

                                <div className="rounded-xl bg-[#f8fbfc] p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Experience
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[#12344d]">
                                        {result.experience || 0} Years
                                    </p>
                                </div>


                                {/* Hospital */}

                                <div className="rounded-xl bg-[#f8fbfc] p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Hospital
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[#12344d]">
                                        {result.hospitalName || "N/A"}
                                    </p>
                                </div>


                                {/* Fee */}

                                <div className="rounded-xl bg-[#f8fbfc] p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Consultation Fee
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-[#064b78]">
                                        ৳{result.consultationFee || 0}
                                    </p>
                                </div>

                            </div>


                            {/* Qualification */}

                            <div className="mt-5 rounded-xl border border-[#e2edf1] p-4">

                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Qualification
                                </p>

                                <p className="mt-1 text-sm leading-6 text-gray-700">
                                    {result.qualifications ||
                                        "Qualification information is not available."}
                                </p>

                            </div>


                            {/* Working Days */}

                            <div className="mt-5">

                                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Available Days
                                </p>

                                <div className="flex flex-wrap gap-2">

                                    {result.schedule?.workingDays?.map(
                                        (day) => (
                                            <span
                                                key={day}
                                                className="rounded-full bg-[#eef5f8] px-3 py-1.5 text-xs font-semibold text-[#064b78]"
                                            >
                                                {day}
                                            </span>
                                        )
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================================
                    APPOINTMENT FORM
                ================================= */}

                <DoctorAppointment
                    doctor={result}
                />

            </div>
        </main>
    );
};

export default Doctordetailspage;