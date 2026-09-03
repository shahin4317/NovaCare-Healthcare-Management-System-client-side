import { requireRole } from '@/lib/api/session';
import React from 'react';

const Patientlayout = async({children}) => {
    await requireRole('patient')
    return children
  
};

export default Patientlayout;