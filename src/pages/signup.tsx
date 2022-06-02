import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().email().required().max(255),
  password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.')
}).required();

type ContactFields = {
  email: string;
  password: string;
}

interface PropertyRowProps {
  label: String
  children: React.ReactNode
  hasError: boolean
  errorMessage: string | undefined
}

const ProperyRow = (props: PropertyRowProps) => {
  const { label, children, hasError, errorMessage } = props
  return (<div className="flex flex-row text-xs py-1 pr-2 md:py-2 flex-wrap">
    <div className="w-20 px-2 py-1">
      <span className="text-md">{label}</span>
    </div>
    <div className="flex-1">
      {children}
    </div>
    {hasError && <div className="w-full">{errorMessage}</div>}
  </div>)
}

const Page = () => {
  const { register, handleSubmit, formState: { isValid, isDirty, errors }, setValue } = useForm<ContactFields>({
    resolver: yupResolver(schema)
  });
  const [hasSubmitted, setSubmitted] = useState(false);
  const onSubmit = handleSubmit(data => {
    if (isValid && isDirty) {
      console.log('submit', data)
    }
  });
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="pt-4 md:w-1/4 md:mx-auto md:p-4">
          <h2 className="text-xl font-bold p-2 pb-4">Sign Up</h2>
          <form onSubmit={onSubmit}>
            <ProperyRow label="E-Mail" hasError={typeof errors.email !== 'undefined'} errorMessage={errors.email?.message}>
              <input
                {...register("email")}
                disabled={hasSubmitted}
                type="text"
                className={`
                  w-full p-0 px-1 py-0 mr-2 rounded-sm 
                  text-white bg-slate-700 border-transparentcfocus:border-gray-900 focus:bg-slate-800 
                  ${errors.email && 'focus:bg-red-900'}`}
              />
            </ProperyRow>
            <ProperyRow label="Password" hasError={typeof errors.password !== 'undefined'} errorMessage={errors.password?.message}>
              <input
                {...register("password")}
                disabled={hasSubmitted}
                type='password'
                className={`
                  w-full p-0 px-1 py-0 mr-2 rounded-sm 
                  text-white bg-slate-700 border-transparentcfocus:border-gray-900 focus:bg-slate-800 
                  ${errors.password && 'focus:bg-red-900'}`}
              />
            </ProperyRow>
            <div className="flex flex-row-reverse px-2 pt-4">
              <input type="submit" className="bg-pink-600 text-white rounded px-2 py-1" />
            </div>
            <hr className="my-4" />
            <div className="flex flex-row-reverse px-2 pt-4 text-center">
              <button className="bg-pink-600 text-white rounded px-2 py-1">Signup with Google</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Sign Up',
    },
  }
}
