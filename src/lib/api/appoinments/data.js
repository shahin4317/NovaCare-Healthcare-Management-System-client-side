import { serverfetch } from "../sarver"

export const getAppoinmentsrDetails = async(patientId)=>{
    const result = await serverfetch(`/api/appointments/patient/${patientId}`)
  console.log(result,'form data.js');
    return result
}

export const getPaymentDetails = async(patientId)=>{
  const result = await serverfetch(`/api/payments/${patientId}`)
  console.log(result,'form data.js');
  return result
}