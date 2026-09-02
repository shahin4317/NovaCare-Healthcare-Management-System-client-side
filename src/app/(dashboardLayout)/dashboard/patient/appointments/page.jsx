import { getAppoinmentsrDetails } from '@/lib/api/appoinments/data';

import { getUserSession } from '@/lib/api/session';
import React from 'react';
import AppointmentsCard from './AppointmentsCard';

const AppoinmentsPage = async() => {
    const session = await getUserSession();
    const patientId = session?.id;
    console.log(patientId);
    const appointment = await getAppoinmentsrDetails(patientId);
    console.log("APPOINTMENTS:", appointment);

    return (
        <div>
            <AppointmentsCard appointment={appointment}></AppointmentsCard>
        </div>
    );
};

export default AppoinmentsPage;