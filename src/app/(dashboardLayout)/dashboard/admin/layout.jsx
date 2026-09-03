import { requireRole } from '@/lib/api/session';


const adminlayout = async({children}) => {
    await requireRole('admin')

    return children
};

export default adminlayout;