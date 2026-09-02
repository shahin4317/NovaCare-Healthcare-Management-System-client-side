import { serverMutation } from "../sarver"


export const addAppointments = async (data)=>{
    const resData = await serverMutation(`/api/appointments`,'POST', data)
    return resData
}

export const getUpdateStatus = async (id, data) => {

    const result = await serverMutation(
        `/api/appointments/${id}/status`,
        "PATCH",
        data
    );

    return result;
};