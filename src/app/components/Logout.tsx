import { doLogout } from "../actions"



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