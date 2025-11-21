import React from 'react';
import NavBar from '../Components/NavBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet>
                {/* All pages will load here dynamically */}
            </Outlet>
        </div>
    );
};

export default MainLayout;