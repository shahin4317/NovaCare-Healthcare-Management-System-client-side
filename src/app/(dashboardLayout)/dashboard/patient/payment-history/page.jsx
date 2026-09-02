import { getPaymentDetails } from '@/lib/api/appoinments/data';
import { getUserSession } from '@/lib/api/session';
import React from 'react';
import PaymentsCard from './PaymentsCard';

const paymentHistory = async () => {
    const session = await getUserSession()

    const patientId = session?.id
   
    const payments = await getPaymentDetails(patientId)


    return (
        <div>
            <PaymentsCard payments ={payments}></PaymentsCard>
        </div>
    );
};

export default paymentHistory;