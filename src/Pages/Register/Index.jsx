import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

const RegisterPage = () => {
    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState(null)
    const [isRegister, setIsRegister] = useState(null)



    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }



    const handleNameUser = (e) => {
        e.preventDefault()
        setUserName(e.target.value)
    }

    const handleEmailUser = (e) => {
        e.preventDefault()
        setUserEmail(e.target.value)
    }

    const handlePasswordUser = (e) => {
        e.preventDefault()
        setUserPassword(e.target.value)
    }


    const handleSubmit = async () => {
        const payload = {
            name: userEmail,
            userName: userName,
            password: userPassword,
            roleId: 1
        }

        try {
            const res = await axios.post("https://api.mudoapi.tech/register", payload)
            const regis = res?.data?.message
            console.log(regis);
            setIsRegister(regis)
            console.log(res);
            setErrorLogin(null)
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } catch (error) {
            setErrorLogin(error?.response?.data?.message)
            console.log(error);
        }
    }


    const handleValidateInput = () => {
        if (!userEmail.length || !userPassword.length || !userName.length) {
            return true
        } else {
            return false
        }
    }

    const handleMessege = () => {
        if(errorLogin) {
            return <p className="text-red-500">{errorLogin}</p>
        }
        else if(isRegister) {
            return <p className="text-green-500">Register Success</p>
        }
        return null
    }


    return (
        <div className='flex h-screen bg-[#F5F5F5]'>
            <div className='flex w-7/12 justify-center items-center'>
                <div className='w-7/12 flex flex-col gap-3'>
                    <h1 className=' font-semibold text-3xl mb-8'>Get Started Now</h1>
                    <div className="flex flex-col gap-6">

                        {handleMessege()}

                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold'>Userame</label>
                            <input
                                type="text"
                                onChange={handleNameUser}
                                placeholder='Your Name'
                                className='font-medium text-sm bg-[#F5F5F5]
                                border px-2 py-2 outline-none border-gray-300 rounded-lg placeholder:text-sm placeholder:text-gray-300' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold'>Email Address</label>
                            <input
                                type="email"
                                onChange={handleEmailUser}
                                placeholder='Enter your email'
                                className='font-medium text-sm bg-[#F5F5F5]
                                border px-2 py-2 outline-none border-gray-300 rounded-lg placeholder:text-sm placeholder:text-gray-300' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold'>Password</label>
                            <input
                                type={type}
                                name="password"
                                value={userPassword}
                                onChange={handlePasswordUser}
                                placeholder='Enter your password'
                                className='font-medium text-sm bg-[#F5F5F5]
                                border px-2 py-2 outline-none border-gray-300 rounded-lg placeholder:text-sm placeholder:text-gray-300'
                                autoComplete="current-password" />
                            <span className=" flex justify-end items-center" onClick={handleToggle}>
                                <Icon className="absolute mr-10 mb-11 text-gray-500" icon={icon} size={20} />
                            </span>
                        </div>

                    </div>
                    <div className='flex gap-3 text-sm'>
                        <input type="checkbox" />
                        <p>I agree with <a href="" className='underline'>terms & policy</a></p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={handleValidateInput()}
                        className='mt-4 px-2 py-1 rounded-xl bg-[#3A5B22] text-white font-semibold tracking-wide hover:bg-[#2F4C1B]'>SignUp</button>

                    <div className="mt-4 flex gap-2 justify-center items-center">
                        <span className="w-full bg-gray-200 h-[1px]"></span>
                        <p className='text-center text-sm'>or</p>
                        <span className="w-full bg-gray-200 h-[1px]"></span>
                    </div>

                    <div className='w-full flex gap-3 justify-between pt-10 '>
                        <Link>
                            <div className='gap-2 flex justify-center items-center border border-gray-300 px-2 p-1 rounded-xl w-52'>
                                <img src="./public/google.png" alt="google" width={25} />
                                <p className='text-sm font-medium'>Sign In with Google</p>
                            </div>
                        </Link>

                        <Link>
                            <div className='gap-2 flex justify-center items-center border border-gray-300 px-2 p-1 rounded-xl w-52'>
                                <img src="./public/apple.png" alt="google" width={22} />
                                <p className='text-sm font-medium'>Sign In with Apple</p>
                            </div>
                        </Link>
                    </div>

                    <p className='mt-4 text-center font-medium'>Have an account? <Link to="/login" className='text-blue-700'>Sign In</Link></p>


                </div>
            </div>
            <div className='w-5/12'>
                <img src="./public/main_banner.png" alt="gambar"
                    className='h-full w-full' />
            </div>
        </div>
    )
}

export default RegisterPage
