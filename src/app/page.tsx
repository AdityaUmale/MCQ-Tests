import Link from 'next/link'
import React from 'react'




const HomePage = async () => {



  return (
    <div>
      <Link href="/login"
      ><button>sign in</button>
      </Link>
      <br />
      <br />
      <Link href="/register">
      <button>register</button>
      </Link>
       
    </div>
  )
}

export default HomePage
