import { baseUrl } from "@/lib/api/baseUrl";
import { stripe } from "@/lib/stripe";
import { Calendar, CircleCheck, Clock, CreditCard, Stethoscope } from "@gravity-ui/icons";

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error(
            "Please provide a valid session_id (`cs_test_...`)"
        );
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
    });

    const metadata = session?.metadata;

    const paymentDetails = {
        appointmentDate: metadata?.appointmentDate,
        appointmentStatus: metadata?.appointmentStatus,
        appointmentTime: metadata?.appointmentTime,
        consultationFee: metadata?.consultationFee,

        doctorId: metadata?.doctorId,
        doctorName: metadata?.doctorName,

        patientEmail: metadata?.patientEmail,
        patientId: metadata?.patientId,
        patientName: metadata?.patientName,

        symptoms: metadata?.symptoms,
        paymentAmount: session?.amount_total,
        transactionId: session?.payment_intent?.id,
        paymentStatus: session?.payment_status,
    };

    console.log("Payment Details:", paymentDetails);

    const response = await fetch(`${baseUrl}/api/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentDetails),
    });

    const result = await response.json();

    console.log(result);

    return (
        <main className="min-h-screen bg-[#f8fbfc] px-4 py-12 sm:py-16">
            <div className="mx-auto w-full max-w-3xl">

                {/* Success Header */}
                <div className="text-center">

                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#064b78] shadow-lg">
                        <CircleCheck className="h-10 w-10 text-white" />

                        <span className="absolute inset-0 animate-ping rounded-full bg-[#064b78]/20" />
                    </div>

                    <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-[#064b78]">
                        NovaCare
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#12344d] sm:text-4xl">
                        Payment Successful!
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                        Your appointment has been successfully booked.
                        Here are your appointment details.
                    </p>
                </div>

                {/* Appointment Card */}
                <div className="mt-10 overflow-hidden rounded-3xl border border-[#dfe8ec] bg-white shadow-sm">

                    {/* Card Header */}
                    <div className="flex items-center gap-4 border-b border-[#dfe8ec] bg-[#064b78] p-6 text-white sm:p-7">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                            <Stethoscope className="h-6 w-6" />
                        </div>

                        <div>
                            <p className="text-xs font-medium text-white/60">
                                Appointment Confirmed
                            </p>

                            <h2 className="mt-1 text-xl font-bold">
                                Dr. {metadata?.doctorName || "Doctor"}
                            </h2>
                        </div>

                    </div>

                    {/* Details */}
                    <div className="p-6 sm:p-8">

                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Date */}
                            <div className="rounded-2xl bg-[#f8fbfc] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef5f8]">
                                        <Calendar className="h-5 w-5 text-[#064b78]" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Appointment Date
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-[#12344d]">
                                            {metadata?.appointmentDate || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Time */}
                            <div className="rounded-2xl bg-[#f8fbfc] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef5f8]">
                                        <Clock className="h-5 w-5 text-[#064b78]" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Appointment Time
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-[#12344d]">
                                            {metadata?.appointmentTime || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Doctor */}
                        <div className="mt-4 rounded-2xl border border-[#dfe8ec] p-5">
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Doctor
                            </p>

                            <p className="mt-2 text-lg font-bold text-[#12344d]">
                                {metadata?.doctorName || "N/A"}
                            </p>
                        </div>

                        {/* Payment */}
                        <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#eef5f8] p-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                                    <CreditCard className="h-5 w-5 text-[#064b78]" />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Payment Status
                                    </p>

                                    <p className="mt-1 text-sm font-bold capitalize text-green-600">
                                        {session?.payment_status || "Paid"}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-xs text-gray-500">
                                    Amount Paid
                                </p>

                                <p className="mt-1 text-xl font-bold text-[#12344d]">
                                  
                                    {(
                                        (session?.amount_total || 0) / 100
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Transaction ID */}
                        {session?.payment_intent?.id && (
                            <div className="mt-5 border-t border-gray-100 pt-5">
                                <p className="text-xs text-gray-400">
                                    Transaction ID
                                </p>

                                <p className="mt-1 break-all text-xs font-medium text-gray-600">
                                    {session.payment_intent.id}
                                </p>
                            </div>
                        )}

                    </div>
                </div>

                {/* Bottom Message */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Thank you for choosing{" "}
                        <span className="font-semibold text-[#064b78]">
                            NovaCare
                        </span>
                        . Please keep your appointment details for future
                        reference.
                    </p>
                </div>

            </div>
        </main>
    );
}