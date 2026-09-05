import { getUserDetails } from "@/lib/api/admin/data";
import React from "react";
import UsersCard from "./UsersCard";


const ManageUsers = async () => {
    const users = await getUserDetails();

    console.log(users);

    return (
        <div>
            <UsersCard
                users={users}
             
            />
        </div>
    );
};

export default ManageUsers;