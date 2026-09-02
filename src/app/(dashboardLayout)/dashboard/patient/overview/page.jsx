import { getUserSession } from '@/lib/api/session';
import React from 'react';
import PatientOverviewCards from './PatientOverviewCards';
import { getAppoinmentsrDetails } from '@/lib/api/appoinments/data';

const Overviewpage = async() => {
 const session = await getUserSession();
  const patientId = session?.id;
  const AppoinmentsDetails =
    await getAppoinmentsrDetails(patientId);

  console.log("Appointments:", AppoinmentsDetails);

    return (
        <div>
            <PatientOverviewCards appointments={AppoinmentsDetails}></PatientOverviewCards>
        </div>
    );
};

export default Overviewpage;