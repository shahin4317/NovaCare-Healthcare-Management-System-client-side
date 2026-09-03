import { serverMutation } from "../sarver";

export const addPrescriptions = async (data) => {
    const resData = await serverMutation('/api/prescriptions', 'POST', data);
    return resData
}