'use server'

import { serverMutation } from "../sarver"

export const addDoctors = async (data)=>{
    const resData = await serverMutation('/api/doctors', 'POST', data);
    return resData
}

export const upDateDoctors = async(data,id)=>{
    const resData = await serverMutation(`/api/doctors/${id}`,'PATCH', data)
   console.log(resData,'/thus sd');
    return resData
}