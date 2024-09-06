import React from 'react'
import { doSocialLogin } from '../actions/authActions'

function SocialLogin() {
  return (
    <form action={doSocialLogin}>
        <button type="submit" name="action" value="google">sign in with google</button>
       </form>
  )
}

export default SocialLogin