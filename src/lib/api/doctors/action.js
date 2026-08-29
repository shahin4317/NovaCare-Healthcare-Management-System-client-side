'use server'

import { serverMutation } from "../sarver"

export const addDoctors = async (data)=>{
    const resData = await serverMutation('/api/doctors', 'POST', data);
    return resData
}