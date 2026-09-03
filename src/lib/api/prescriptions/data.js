import { serverfetch } from "../sarver";


export const getPrescriptions = async(appointmentId)=>{
    const res = await serverfetch( `/api/prescriptions/${appointmentId}`)
    console.log(res,'data.js ');
    return res
}