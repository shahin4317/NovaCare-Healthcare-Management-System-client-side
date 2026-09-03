

import { getAppoinmentsId } from "@/lib/api/appoinments/data";

import PrescriptionCard from "@/components/PrescriptionCard";


const  appoinmentid= async ({ params }) => {
    const { appointmentId } = await params;


    console.log("Appointment ID:", );

    const appointment = await getAppoinmentsId(appointmentId);

    const  Id= appointment?._id

    console.log(Id,'sajkdfj');
    const patientName = appointment?.patientName

    console.log("Appointment:", appointment);
   const doctorId = appoinmentid?.doctorId
   

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
            <div className="mx-auto max-w-4xl">

                {/* Page Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-medium text-blue-600">
                        Appointment
                    </p>

                    <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                        Create Prescription
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Create and issue a prescription for your patient.
                    </p>
                </div>

                {/* Prescription Form */}
                <PrescriptionCard appointmentId={Id} patientName={patientName} doctorId={doctorId}></PrescriptionCard>
            </div>
        </div>
    );
};

export default appoinmentid;