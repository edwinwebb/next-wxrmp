//import { LoginIcon, LogoutIcon, UserIcon } from "@heroicons/react/solid"

import { UserIcon } from "@heroicons/react/solid"

// TODO - Make the proper user flow

// interface ControlButtonProps {
//   children: React.ReactNode
//   onClick: () => void
// }

// const ControlButton = (props: ControlButtonProps) => {
//   const { children, onClick } = props
//   return (<button className="text-sm rounded border-blackpink-800 mr-2 px-2 border-2 box-border hover:border-blackpink-300 hover:bg-blackpink-500 " onClick={() => { onClick() }}>
//     {children}
//   </button>)
// }

// interface AnonUserProps {
//   userID: string | undefined
// }

// const AnonUser = (props: AnonUserProps) => {
//   const { userID } = props
//   return (<div>
//     <UserIcon className='h-3 w-3 inline mr-1' />
//     <span className="text-xs">ID: {userID}</span>
//     <ControlButton onClick={() => { }}>
//       <LoginIcon className='h-3 w-3 inline mr-1' />
//       Login
//     </ControlButton>
//     <ControlButton onClick={() => { }}>
//       Register
//     </ControlButton>
//   </div>)
// }

// interface RegisteredUserProps {
//   userName: string | undefined
// }

// const RegisteredUser = ({ userName }: RegisteredUserProps) => {
//   return (<div>
//     <UserIcon className='h-3 w-3 inline mr-1' />
//     <span className="text-xs">ID: {userName}</span>
//     <ControlButton onClick={() => { }}>
//       <LogoutIcon className='h-3 w-3 inline mr-1' />
//       Logout
//     </ControlButton>
//   </div>)
// }

interface UserControlProps {
  userID: string | undefined
  loading: boolean
}

const UserControls = ({ userID, loading }: UserControlProps) => {
  return (<div className="bg-blackpink-900 text-white h-18 py-2 border-blackpink-800 border-b-2">
    <UserIcon className='h-3 w-3 inline mx-2' />
    {loading
      ? <span className="rounded h-4 w-24 bg-slate-900 inline-block"></span>
      : <span className="inline-block text-xs">{userID}</span>
    }
  </div >)
}

export default UserControls
