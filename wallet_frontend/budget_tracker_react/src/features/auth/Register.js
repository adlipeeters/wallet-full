import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useRegisterMutation } from './authApiSlice'


const Login = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

    const handleChange = (event) => {
        setCredentials({
            ...credentials, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(credentials)

        try {
            // console.log(user, pwd)
            let data = { ...credentials }
            const userData = await register(data).unwrap()
            console.log(userData)
            // dispatch(setCredentials({ ...userData, user }))
            // setUser('')
            // setPwd('')
            navigate('../login')
        } catch (err) {
            console.log(err)
        }
    }

    const content = isLoading ? <div className="text-center flex justify-center items-center h-screen">
        <div role="status">
            <svg className="inline mr-2 w-32 h-32 text-gray-200 animate-spin dark:text-purple-main fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    </div> : (
        <>
            {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
            {/* <h1>Employee Login</h1> */}
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mx-auto my-32">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-black">
                            Create new Account
                        </h2>
                        <p className="mt-2 text-center text-sm text-txtColor">
                            Or&nbsp;
                            <Link to="../login"><span className="font-medium text-purple-main hover:text-purple-hover">Sign In</span></Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        {/* <div className="-space-y-px rounded-md shadow-sm"> */}
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                id="email"
                                onChange={handleChange}
                                value={credentials.email}
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block py-2.5 px-0 w-full text-sm text-txtColor bg-transparent border-0 border-b-2 border-purple-main appearance-none dark:text-txtColor dark:border-gray-600 dark:focus:border-purple-hover focus:outline-none focus:ring-0 focus:border-purple-main peer"
                                placeholder=" "
                            />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email address
                            </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                id="username"
                                onChange={handleChange}
                                value={credentials.username}
                                name="username"
                                type="text"
                                autoComplete="name"
                                required
                                className="block py-2.5 px-0 w-full text-sm text-txtColor bg-transparent border-0 border-b-2 border-purple-main appearance-none dark:text-txtColor dark:border-gray-600 dark:focus:border-purple-hover focus:outline-none focus:ring-0 focus:border-purple-main peer"
                                placeholder=" "
                            />
                            <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Username
                            </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                id="name"
                                onChange={handleChange}
                                value={credentials.name}
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="block py-2.5 px-0 w-full text-sm text-txtColor bg-transparent border-0 border-b-2 border-purple-main appearance-none dark:text-txtColor dark:border-gray-600 dark:focus:border-purple-hover focus:outline-none focus:ring-0 focus:border-purple-main peer"
                                placeholder=" "
                            />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Name
                            </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                value={credentials.password}
                                autoComplete="current-password"
                                required
                                className="block py-2.5 px-0 w-full text-sm text-txtColor bg-transparent border-0 border-b-2 border-purple-main appearance-none dark:text-txtColor dark:border-gray-600 dark:focus:border-purple-hover focus:outline-none focus:ring-0 focus:border-purple-main peer"
                                placeholder=" "
                            />
                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Password
                            </label>
                        </div>
                        {/* </div> */}

                        {/* <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-purple-main hover:text-purple-hover">
                                    Forgot your password?
                                </a>
                            </div>
                        </div> */}

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-main py-2 px-4 text-sm font-medium text-white hover:bg-purple-hover focus:outline-none focus:ring-2 focus:ring-purple-main focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                </span>
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

    return content
}
export default Login