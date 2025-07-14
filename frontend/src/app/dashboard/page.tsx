"use client";
import Logo from '@/app/images/logo.png';
import ProfilePic from '@/app/images/profile_pic.png';
import mark_badge from '@/app/images/mark_badge.png';
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Shift = {
  id: number;
  date: string;
  time: {
    start: string;
    end: string;
  };
  is_booked: boolean;
};
export default function Dashboard() {
  const [shifts, setShifts] = useState<Shift[]>([])

  const router = useRouter()

  const fetchShifts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shifts', {
        withCredentials: true,
      })

      setShifts(response.data);
    } catch (error: any) {
        router.push('/')
      alert("Please Log in to access this page");
    }
  }

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleBookShift = async (shiftId: any) => {
    try{
        const response = await axios.post(`http://localhost:5000/api/book/${parseInt(shiftId)}`, {},
    { withCredentials: true })

        if (response.status == 200){
            alert('Shift Booked Successfully')
            fetchShifts()
        }
    }catch(error: any){
        alert(error)
    }
  }

  const handleLogOut = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout){
        return
    }
    try{
        const response = await axios.post('http://localhost:5000/api/logout', {}, {withCredentials: true})
        if (response.status == 200){
            router.push('/')
        }
    }catch(error){
        alert(error)
    }
  }

  return (
    <div className="px-5 py-5">
      <header className="flex justify-between">
        <button onClick={()=>{router.push('/')}}>
            <Image src={Logo} alt="Logo" className="w-fit h-[3rem]" />
        </button>

        <button onClick={handleLogOut}>
            <Image src={ProfilePic} alt="ProfilePic" className="w-fit h-[3rem]" />
        </button>
      </header>

      <section className="mt-12 flex flex-wrap justify-start gap-x-8 gap-y-8">
        {shifts.map((shift) => (
          <article
            key={shift.id}
            className="bg-[#E4E3E3] font-medium px-5 py-3 shrink-0 rounded-2xl flex flex-col justify-between w-[12rem] h-[12rem]"
          >
            <div>
              <p className="text-[20px] text-[#1F1E1E]">
                {new Date(shift.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
              </p>
              <p className="text-[14px] text-[#1F1E1E] mt-1">{shift.time.start} to {shift.time.end}</p>

              {shift.is_booked ? (                          
                <Image src={mark_badge} alt="Booked" className="w-[1.8rem] mt-3" />
              ) : (
                <p className="text-[14px] bg-[#D4D2D2] text-[#1F1E1E] px-4 py-1 rounded-full mt-3 w-fit">
                  Available
                </p>
              )}
            </div>

            {shift.is_booked ? (
              <p className="bg-[#D4D2D2] text-center text-[#1F1E1E] py-2 w-full rounded-xl">Booked</p>
            ) : (
              <button 
                className="bg-[#2B2B2B] text-[#E4E3E3] py-2 w-full rounded-xl"
                onClick={()=>{handleBookShift(shift.id)}}
                >
                Book Shift
              </button>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
