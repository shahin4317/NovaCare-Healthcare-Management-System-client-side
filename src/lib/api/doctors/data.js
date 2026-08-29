import { serverfetch } from "../sarver"

export const doctorProfile = async(email)=>{
    const result = await serverfetch(`/api/doctors/${email}`)
    console.log(result);
    return result
}