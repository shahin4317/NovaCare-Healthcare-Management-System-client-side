import { deleteMutation, serverMutation } from "../sarver";

export const deleteUser = async (id) => {
    const resData = await deleteMutation(`/api/user/${id}`);
    return resData
}
export const upDateStatus = async (id) => {
    const resData = await serverMutation(
        `/api/doctor/status/${id}`,
        "PATCH"
    );

    return resData;
};