import { getAppoinmentsrDetails } from "@/lib/api/appoinments/data";
import { getUserSession } from "@/lib/api/session";



const AppoinmentsPage = async () => {
    const session = await getUserSession()
    console.log(session);
    const doctorId = session?.user?.id



    const AppoinmentsDetails = await getAppoinmentsrDetails(doctorId);
    console.log(AppoinmentsDetails);

    

    return (
        <div>
         <h1>appoinments paeg </h1>
            
        </div>
    );
};

export default AppoinmentsPage;