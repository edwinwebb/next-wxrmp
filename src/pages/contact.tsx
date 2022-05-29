import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object({
  name: yup.string().max(64).required(),
  email: yup.string().email().required().max(255),
  message: yup.string().min(128).required()
}).required();

type ContactFields = {
  name: string;
  email: string;
  message: string;
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
      <span>{label}</span>
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
        <h2 className="text-xl font-bold pt-4 pb-2">Contact Us</h2>
        <div className="pt-4 md:w-1/2 md:mx-auto md:p-4">
          <form onSubmit={onSubmit}>
            <ProperyRow label="Name" hasError={typeof errors.name !== 'undefined'} errorMessage={errors.name?.message}>
              <input
                {...register("name")}
                className={`
                  w-full p-0 px-1 py-1 mr-2 rounded-sm 
                  text-white bg-slate-700 border-transparentcfocus:border-gray-900 focus:bg-slate-800 
                  ${errors.name && 'focus:bg-red-900'}`}
              />
            </ProperyRow>
            <ProperyRow label="E-Mail" hasError={typeof errors.email !== 'undefined'} errorMessage={errors.email?.message}>
              <input
                {...register("email")}
                className={`
                  w-full p-0 px-1 py-1 mr-2 rounded-sm 
                  text-white bg-slate-700 border-transparentcfocus:border-gray-900 focus:bg-slate-800 
                  ${errors.email && 'focus:bg-red-900'}`}
              />
            </ProperyRow>
            <ProperyRow label="Message" hasError={typeof errors.message !== 'undefined'} errorMessage={errors.message?.message}>
              <textarea
                {...register("message")}
                className={`
                  w-full h-44 md:h-64 p-0 px-1 py-1 mr-2 rounded-sm 
                  text-white bg-slate-700 border-transparentcfocus:border-gray-900 focus:bg-slate-800 
                  ${errors.message && 'focus:bg-red-900'}`}
              />
            </ProperyRow>
            <div className="flex flex-row-reverse px-4 pt-4">
              <input type="submit" className="bg-pink-600 text-white rounded px-2 py-1" />
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
      title: 'Contact',
    },
  }
}
