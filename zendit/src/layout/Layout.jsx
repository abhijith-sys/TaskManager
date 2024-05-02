import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar'
import styles from "./Layout.module.css"
import Header from '../components/Header/Header'
const Layout = () => {
    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.contentContainer}>
                <Header />
                <Suspense >
                    <Outlet />
                </Suspense>
            </div>

        </div>
    )
}

export default Layout
