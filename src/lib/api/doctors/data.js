
import { serverfetch } from "../sarver"

export const doctorProfile = async(id)=>{
    const result = await serverfetch(`/api/doctors/${id}`)
    console.log(result,'this is doctor profile data ');
    return result
}
export const scheduleDetails = async(id)=>{
    const result = await serverfetch(`/api/doctors/${id}/schedule`)
    console.log(result);
    return result
}
export const findDoctor = async()=>{
    const res = await serverfetch(`/api/doctors`)
    return res
}

export const getDoctorDetails = async(id)=>{
    const result = await serverfetch(`/api/doctors/details/${id}`)
    return result
}

export const getPatientRequest = async(doctorId)=>{
    const res = await serverfetch(`/api/appointments/doctor/${doctorId}`)
    console.log(res,'data.js ');
    return res
}