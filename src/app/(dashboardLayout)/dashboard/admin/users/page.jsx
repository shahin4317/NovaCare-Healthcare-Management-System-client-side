import { getUserDetails } from '@/lib/api/admin/data';
import React from 'react';
import UsersCard from './UsersCard';

const manageUsers = async() => {
    const users = await getUserDetails()
    console.log(users);
    
    return (
        <div>
            <UsersCard users={users}></UsersCard>
        </div>
    );
};

export default manageUsers;