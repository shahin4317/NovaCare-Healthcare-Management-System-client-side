import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const mainlayout = ({children}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
            
        </div>
    );
};

export default mainlayout;