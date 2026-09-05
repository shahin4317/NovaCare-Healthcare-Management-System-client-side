
import { getPaymentsDetails } from '@/lib/api/admin/data';
import React from 'react';
import { PaymentCards } from './PaymentCards';


const paymentDetailsPage =async () => {
    const payment = await getPaymentsDetails()
    console.log(payment);

    return (
        <div>
            <PaymentCards payment={payment}></PaymentCards>
            
        </div>
    );
};

export default paymentDetailsPage;