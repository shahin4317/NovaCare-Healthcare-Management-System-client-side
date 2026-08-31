import { serverfetch } from "../sarver"

export const getAppoinmentsrDetails = async(doctorId)=>{
    const result = await serverfetch(`/api/appointments?doctorId=${doctorId}`)
  console.log(result,'form data.js');
    return result
}