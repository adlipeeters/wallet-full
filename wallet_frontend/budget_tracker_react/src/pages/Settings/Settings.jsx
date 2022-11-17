import React, { useState, useEffect } from 'react'
import Box from '../../components/box/Box'
import { useChangeProfileImageMutation } from '../../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { updateProfileImage } from '../../features/auth/authSlice.js'
import UploadProfileImage from './settings_components/UploadProfileImage'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../../components/dashboard-wrapper/DashboardWrapper'
import Credentials from './settings_components/Credentials'
import Test from './settings_components/Test'


const Settings = () => {
    return (
        <div className="row">
            <div className="col-4 col-lg-4 col-md-6 col-sm-12 mb">
                <Box>
                    <UploadProfileImage />
                </Box>
            </div>
            <div className="col-8 col-lg-8 col-md-6 col-sm-12 mb">
                <Box>
                    <Credentials />
                </Box>
            </div>
            {/* <div className="col-8 col-lg-8 col-md-6 col-sm-12 mb">
                <Box>
                    <Test />
                </Box>
            </div> */}
        </div>
    )
}

export default Settings