import Navbar from '@/components/Navbar';
import React from 'react';

const mainlayout = ({children}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            
        </div>
    );
};

export default mainlayout;