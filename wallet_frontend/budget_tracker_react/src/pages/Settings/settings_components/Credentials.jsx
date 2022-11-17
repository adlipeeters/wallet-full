import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useUpdatePasswordMutation } from '../../../features/auth/authApiSlice.js'
import { useSelector } from "react-redux"
import { selectCurrentUser } from '../../../features/auth/authSlice.js'

const Credentials = () => {

  const { id, ...otherInfo } = useSelector(selectCurrentUser)

  const [credentials, setCredentials] = useState({
    oldPassword: '',
    newPassword: '',
    confirm_newPassword: '',
  })
  
  const [error, setError] = useState({
    message: '',
    show: false
  })

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const handleChange = (event) => {
    setCredentials({
      ...credentials, [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(credentials)
    if (credentials.oldPassword === '' && credentials.newPassword === '' && credentials.confirm_newPassword === '') {
      setError({ ...error, message: 'Complete all fields', show: true })
    }
    else if (credentials.newPassword !== credentials.confirm_newPassword) {
      setError({ ...error, message: 'Confirm Password doesn\'t match with new password', show: true })
    } else {
      setError({ ...error, message: '', show: false })
      try {
        const { oldPassword, newPassword, ...others } = credentials
        const data = await updatePassword({ id, oldPassword, newPassword }).unwrap()
        setCredentials({
          oldPassword: '',
          newPassword: '',
          confirm_newPassword: '',
        })
      } catch (error) {
        if (error.data.statusCode === 403) {
          setError({ ...error, message: 'Wrong old password', show: true })
        }
      }
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
      <div className="title">Password information</div>
      {/*  */}
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

      {/*  */}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              id="oldPassword"
              onChange={handleChange}
              value={credentials.oldPassword}
              name="oldPassword"
              type="password"
              autoComplete="off"
              required
              className="block py-2.5 px-0 w-full text-sm text-txtColor bg-transparent border-0 border-b-2 border-purple-main appearance-none dark:text-txtColor dark:border-gray-600 dark:focus:border-purple-hover focus:outline-none focus:ring-0 focus:border-purple-main peer"
              placeholder=" "
            />
            <label htmlFor="oldPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Current password
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              id="newPassword"
              onChange={handleChange}
              value={credentials.newPassword}
              name="newPassword"
              type="password"
              autoComplete="off"
              required
              className="block py-2.5 px-0 w-full text-sm text-txtColor bg-transparent border-0 border-b-2 border-purple-main appearance-none dark:text-txtColor dark:border-gray-600 dark:focus:border-purple-hover focus:outline-none focus:ring-0 focus:border-purple-main peer"
              placeholder=" "
            />
            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              New password
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              id="confirm_newPassword"
              onChange={handleChange}
              value={credentials.confirm_newPassword}
              name="confirm_newPassword"
              type="password"
              autoComplete="off"
              required
              className="block py-2.5 px-0 w-full text-sm text-txtColor bg-transparent border-0 border-b-2 border-purple-main appearance-none dark:text-txtColor dark:border-gray-600 dark:focus:border-purple-hover focus:outline-none focus:ring-0 focus:border-purple-main peer"
              placeholder=" "
            />
            <label htmlFor="confirm_newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirm password
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <button
            type="submit"
            disabled={isLoading ? true : false}
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
            {isLoading ? <p>Processing...</p> : <p>Update password</p>}
          </button>
        </div>
      </form>
    </>
  )
}

export default Credentials