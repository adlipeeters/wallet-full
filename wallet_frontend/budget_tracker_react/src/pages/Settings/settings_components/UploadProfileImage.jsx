import React, { useState, useEffect } from 'react'
import Box from '../../../components/box/Box'
import { useChangeProfileImageMutation } from '../../../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { updateProfileImage } from '../../../features/auth/authSlice.js'


const UploadProfileImage = () => {
    const dispatch = useDispatch()
    const [image, setImage] = useState()
    const [error, setError] = useState({
        message: '',
        show: false
    })
    const handleChange = (e) => {
        setImage(e.target.files[0])
    }

    const [changeProfileImage, { isLoading }] = useChangeProfileImageMutation()

    const changeUserProfileImage = async () => {
        if (image) {
            const formData = new FormData()
            formData.append('file', image)
            const userImage = await changeProfileImage(formData).unwrap()
            if (userImage.profileImage) {
                dispatch(updateProfileImage(userImage.profileImage))
                setImage('')
            }
        } else {
            setError({ ...error, message: 'Upload image', show: true })
        }
    }

    useEffect(() => {
        if (error.show) {
            setTimeout(() => {
                setError({ show: false });
            }, 3000)
        }
    }, [error])
    return (
        <>
            <div className="title">Change profile Image</div>
            {error.show ?
                <div
                    id="alert-5"
                    className="flex p-4 bg-gray-100 rounded-lg dark:bg-orange"
                    role="alert"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="font-semibold hover:text-gray-800">{error.message}</span>
                    </div>
                    <button onClick={() => setError({ message: '', show: false })} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-gray-100 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex h-8 w-8 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white" data-dismiss-target="#alert-5" aria-label="Close">
                        <span className="sr-only">Dismiss</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                : ''}
            <div className="flex justify-center items-center w-full mt-2 mb-2">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-48 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleChange} />
                </label>
            </div>
            <button
                onClick={changeUserProfileImage}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-main py-2 px-4 text-sm font-medium text-white hover:bg-purple-hover focus:outline-none focus:ring-2 focus:ring-purple-main focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    {isLoading ?
                        <svg className="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-purple-main fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    }
                </span>
                {isLoading ? <p>Processing...</p> : <p>Update image</p>}
            </button>
        </>
    )
}

export default UploadProfileImage