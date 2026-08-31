import { serverMutation } from "../sarver"


export const addAppointments = async (data)=>{
    const resData = await serverMutation(`/api/appointments`,'POST', data)
    return resData
}