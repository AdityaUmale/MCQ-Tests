import React from 'react'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import Logout from '../components/Logout';



const HomePage = async () => {

    const session = await auth();

    if (!session?.user) redirect("/")

  return (
    <div>HomePage
        <Logout/>
    </div>
  )
}

export default HomePage