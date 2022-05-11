import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'

const Dom = ({ children }) => {
  // const ref = useRef(null)
  // useEffect(() => {
  //   useStore.setState({ dom: ref })
  // }, [])

  return (
    <>
      {children}
    </>
  )
}

export default Dom
