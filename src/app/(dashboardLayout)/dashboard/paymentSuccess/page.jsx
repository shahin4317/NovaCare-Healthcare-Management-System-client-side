import { baseUrl } from "@/lib/api/baseUrl";
import { stripe } from "@/lib/stripe";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
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
    <section id="success">
      <p>Payment Successful</p>
    </section>
  );
}