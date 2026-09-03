import { serverfetch } from "../sarver"

export const getUserDetails = async()=>{
    const result = await serverfetch(`/api/user`)
    return result
}