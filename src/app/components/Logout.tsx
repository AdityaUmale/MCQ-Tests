import { doLogout } from "../actions/authActions"



function Logout() {
  return (
    <form action={doLogout}>
      <button type="submit">
        Logout
      </button>
    </form>
  )
}

export default Logout