
import { requireRole } from '@/lib/api/session';


const Patientlayout = async({children}) => {
    await requireRole('doctor')
    return children
  
};

export default Patientlayout;