import { findDoctor } from '@/lib/api/doctors/data';
import React from 'react';
import FindDoctorCard from './FindDoctorCard';

const findpage = async() => {
    const doctors = await findDoctor();
    
    return (
        <div>
            <FindDoctorCard doctors={doctors}></FindDoctorCard>

        </div>
    );
};

export default findpage;