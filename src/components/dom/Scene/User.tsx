import { UserIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"

const UserControls = () => {
  const [userName, setUserName] = useState('unauthourized')

  return (<div>
    <UserIcon />
    <span>{userName}</span>
  </div>)
}

export default UserControls
