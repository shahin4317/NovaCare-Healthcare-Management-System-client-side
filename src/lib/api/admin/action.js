import { deleteMutation } from "../sarver";

export const deleteUser = async (id) => {
    const resData = await deleteMutation(`/api/user/${id}`);
    return resData
}