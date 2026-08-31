'use server'

import { deleteMutation, serverMutation } from "../sarver";




export const addDoctors = async (data) => {
    const resData = await serverMutation('/api/doctors', 'POST', data);
    return resData
}


export const addSchedule = async (data, id) => {
    const resData = await serverMutation(`/api/doctors/${id}/schedule`, 'POST', data);
    return resData
}
export const updateSchedule = async( data, id)=>{
    const resData = await serverMutation(`/api/doctors/${id}/schedule`, "PATCH", data)

    return resData
}

export const deleteSchedule = async (id)=>{
    const resData = await deleteMutation(`/api/doctors/${id}/schedule` )
    return resData
}

export const upDateDoctors = async (data, id) => {
    const resData = await serverMutation(`/api/doctors/${id}`, 'PATCH', data)
    return resData
}

