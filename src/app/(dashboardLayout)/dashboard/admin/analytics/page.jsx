import { getAppoinments, getPaymentsDetails, getUserDetails } from '@/lib/api/admin/data';
import React from 'react';
import AnalyticsCard from './AnalyticsCard';

const analyticsPage = async() => {
    const appointments = await getAppoinments()
    console.log(appointments,'analysis');
    const users =await getUserDetails()
    console.log(users,'user');
    return (
        <div>
            <AnalyticsCard appointments={appointments} users = {users} ></AnalyticsCard>
        </div>
    );
};

export default analyticsPage;