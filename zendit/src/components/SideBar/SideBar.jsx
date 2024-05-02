import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import styles from "./SideBar.module.css"

import logo from "../../assets/logo.svg"
import icon1 from "../../assets/icons/icon1.svg"
import icon2 from "../../assets/icons/icon2.svg"
import icon3 from "../../assets/icons/icon3.svg"
import icon4 from "../../assets/icons/icon4.svg"
import icon5 from "../../assets/icons/icon5.svg"
import icon6 from "../../assets/icons/icon6.svg"
import icon7 from "../../assets/icons/icon7.svg"
import PathConstants from '../../router/PathConstants';


const SideBar = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);
    const handleMouseEnter = () => {
        setSidebarCollapsed(false);
    };

    const handleMouseLeave = () => {
        setSidebarCollapsed(true);
    };

    return (
        <Sidebar collapsed={isSidebarCollapsed} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} collapsedWidth="80px"
            width="200px" className={styles.sidebar} >
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <img src={logo} alt="Logo" style={{ maxWidth: '100%' }} />
            </div>
            <Menu menuItemStyles={{
                button: {
                    '&.active': {
                        backgroundColor: '#13395e',
                        color: '#b6c8d9',
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 128, 0.1)', // Change background color to blue on hover
                    },
                },
            }}>
                <MenuItem icon={<img src={icon1} alt="React Logo" />} component={<Link to={PathConstants.HOME} />}  >Projecs</MenuItem>
                <MenuItem icon={<img src={icon2} alt="React Logo" />} >Activities</MenuItem>
                <MenuItem icon={<img src={icon3} alt="React Logo" />} >Reports</MenuItem>
                <MenuItem icon={<img src={icon4} alt="React Logo" />} >Users</MenuItem>
                <MenuItem icon={<img src={icon5} alt="React Logo" />} component={<Link to={PathConstants.TEMPLATES} />} >Templates</MenuItem>
                <MenuItem icon={<img src={icon6} alt="React Logo" />} >Roles</MenuItem>
                <MenuItem icon={<img src={icon7} alt="React Logo" />} >Settings</MenuItem>
            </Menu>
        </Sidebar>
    );
};


export default SideBar;
