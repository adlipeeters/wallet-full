import React, { useEffect, useState } from 'react'
import './user-info.scss'
import { useSelector } from "react-redux"
import { selectCurrentToken } from '../../features/auth/authSlice.js'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// import { useGetImageQuery } from '../../features/auth/authApiSlice.js'

const UserInfo = ({ user }) => {
    const token = useSelector(selectCurrentToken)
    const [image, setImage] = useState('')


    useEffect(() => {
        const url = "http://localhost:3500/users/profile-image/" + user.profileImage;

        const getImage = async () => {
            try {
                const response = await fetch(url, {
                    headers: new Headers({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                });
                const imageBlob = await response.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImage(imageObjectURL);
            } catch (error) {
                console.log("error", error);
            }
        };
        if (user.profileImage) {
            getImage();
        }
    }, [user]);


    return (
        <div className='user-info'>
            {/* <div className="user-info__img">
                <img src={image} alt="" />
            </div> */}
            <div className="user-info flex -space-x-2 overflow-hidden">
                <Stack direction="row" spacing={2}>
                    <Avatar alt={user.name} src={image} />
                </Stack>
                {/* <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={image} alt="" /> */}
            </div>
            <div className="user-info__name">
                <span>{user.name}</span>
            </div>
        </div>
    )
}

export default UserInfo
