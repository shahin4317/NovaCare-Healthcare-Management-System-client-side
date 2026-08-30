
import { serverfetch } from "../sarver"

export const doctorProfile = async(email)=>{
    const result = await serverfetch(`/api/doctors/${email}`)
    console.log(result);
    return result
}
export const scheduleDetails = async(email)=>{
    const result = await serverfetch(`/api/doctors/${email}/schedule`)
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