"use client"
import Logo from '@/app/images/logo.png'
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginLabel, setLoginLabel] = useState('Login')

  const router = useRouter()

  const handleLogin = async () => {
    try{
      setLoginLabel('Logging in...')
      const response = await axios.post(
        'https://rickshealthservicestest-api.onrender.com/api/login',
        {
          email: email.trim(), 
          password: password.trim()
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.status == 200){
        alert("Login successful")
        router.push('/dashboard')
      }
    }catch (error: any){
      console.error(error)
      alert('Incorrect email or password');
    }finally{
      setLoginLabel('Login')
    }
  }


  return (
    <div className='flex justify-center items-center h-full'>
      <div className='bg-[#1F1E1E] w-[25rem] rounded-2xl flex flex-col gap-y-3 justify-center items-center px-8 py-4'>
        <Image src={Logo} alt='Logo' className='w-[8rem]'/>

        <p className='text-[#E4E3E3] text-[20px]'>Welcome back! Please log in</p>

        <section className='space-y-3 mt-3 mb-12'>
          <input 
            type="text" 
            placeholder='Email' 
            className='bg-[#2F2E2E] text-[16px] text-[#E4E3E3] placeholder:opacity-30 
                        focus:ring-0 focus:outline-none w-full px-3 py-2 rounded-lg'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input 
            type="password" 
            placeholder='Password' 
            className='bg-[#2F2E2E] text-[16px] text-[#E4E3E3] placeholder:opacity-30 
                        focus:ring-0 focus:outline-none w-full px-3 py-2 rounded-lg'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </section>

        <button 
          className='bg-[#2B2B2B] text-[16px] w-full py-2 rounded-full text-[#E4E3E3]'
          onClick={handleLogin}
          >
          {loginLabel}
        </button>

        <p className='text-[16px]'>Don&#39;t have an account? sign up</p>
      </div>
    </div>
  );
}
