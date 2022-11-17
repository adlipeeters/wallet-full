import React from 'react'
import { Outlet, useLocation, Navigate, } from 'react-router-dom'
import Header from './landing_components/Header'
import styles from '../../scss/Custom.module.scss'

const LandingLayout = () => {
    return (
        <div className={styles.fadeAnimation}>
            <Header />
            <Outlet />
        </div>
    )
}

export default LandingLayout