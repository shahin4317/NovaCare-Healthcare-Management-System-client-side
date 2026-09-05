import { getAppoinments } from '@/lib/api/admin/data';
import React from 'react';
import AppoinmentsCards from './AppoinmentsCards';

const appointmentsPage = async() => {
    const appointments = await getAppoinments()

    return (
        <div>
            <AppoinmentsCards appointments={appointments}></AppoinmentsCards>
            
        </div>
    );
};

export default appointmentsPage;