import React from 'react';
import NavBar from '../Components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet>
                {/* All pages will load here dynamically */}
            </Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;