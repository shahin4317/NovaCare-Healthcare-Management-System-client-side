import { getPatientRequest } from '@/lib/api/doctors/data';
import { getUserSession } from '@/lib/api/session';
import React from 'react';
import AppoinmentCard from './AppoinmentCard';

const appoinmentpage = async() => {
    const session = await getUserSession();
    const doctorId = session?.id;
    const AppoinmentsDetails = await getPatientRequest(doctorId);
    console.log("APPOINTMENTS:", AppoinmentsDetails);

    return (
        <div>
            <AppoinmentCard AppoinmentsDetails={AppoinmentsDetails}></AppoinmentCard>

        </div>
    );
};

export default appoinmentpage;