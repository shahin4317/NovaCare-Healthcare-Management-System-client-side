import React from 'react';
import Overviewcard from './Overviewcard';
import { getUserSession } from '@/lib/api/session';

import { getPatientRequest } from '@/lib/api/doctors/data';

const viewpage = async() => {
    const session = await getUserSession();
    const doctorId = session?.id;
    const AppoinmentsDetails = await getPatientRequest(doctorId);
    console.log("APPOINTMENTS:", AppoinmentsDetails);
    return (
        <div>
            <Overviewcard AppoinmentsDetails={AppoinmentsDetails}></Overviewcard>
        
            
        </div>
    );
};

export default viewpage;