import { serverfetch } from "../sarver"

export const getUserDetails = async()=>{
    const result = await serverfetch(`/api/user`)
    return result
}

export const getPaymentsDetails = async()=>{
    const result = await serverfetch(`/api/payments`)
    return result
}
export const getAppoinments = async()=>{
    const result = await serverfetch('/api/appointments')
    return result
}