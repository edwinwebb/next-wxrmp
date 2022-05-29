import useStore from "@/helpers/store"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  background: yup.string().required(),
  name: yup.string().max(64),
  description: yup.string().max(256)
}).required();

type GlobalsData = {
  name: string;
  description: string;
  background: string;
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

const Globals = () => {
  const setSceneGlobals = useStore(s => s.setSceneGlobals)
  const [name, description, background] = useStore(s => [s.scene.name, s.scene.description, s.scene.backgroundcolor])
  const { register, handleSubmit, formState: { isValid, isDirty, errors }, setValue } = useForm<GlobalsData>({
    resolver: yupResolver(schema),
    mode: "onBlur"
  });
  // enter handler, need the hidden input
  const onSubmit = handleSubmit(data => {
    if (isValid && isDirty) {
      console.log('to store', data)
      setSceneGlobals(data.name, data.description, data.background)
    }
  });

  // link to store
  useEffect(() => {
    setValue('name', name)
    setValue('description', description)
    setValue('background', background)
  }, [name, description, background])

  return (<div>
    <h3 className="text-sm px-2 font-bold pt-2">Globals</h3>
    <div>
      <form
        onSubmit={onSubmit}
        onBlur={onSubmit}>
        <div className="text-xs py-1">
          <label className={`${errors.background && 'bg-red-500'} inline-block w-20 text-x md:py-2 px-2`}>Background</label>
          <input {...register("background")} defaultValue={background} type="color" className='text-xs text-white w-16 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent focus:border-gray-900 focus:bg-slate-800' />
        </div>
        <ProperyRow label="Name" hasError={typeof errors.name !== 'undefined'} errorMessage={errors.name?.message}>
          <input
            {...register("name")}
            defaultValue={name}
            className={`
            w-full p-0 px-1 py-1 mr-2 rounded-sm 
            text-xs text-white bg-slate-700 border-transparentcfocus:border-gray-900 focus:bg-slate-800 
           ${errors.name && 'focus:bg-red-900'}`} />
        </ProperyRow>
        <ProperyRow label="Description" hasError={typeof errors.description !== 'undefined'} errorMessage={errors.description?.message}>
          <input
            {...register("description")}
            defaultValue={description}
            className={`
            w-full p-0 px-1 py-1 mr-2 rounded-sm 
            text-xs text-white bg-slate-700 border-transparentcfocus:border-gray-900 focus:bg-slate-800 
           ${errors.name && 'focus:bg-red-900'}`} />
        </ProperyRow>

        <input type="submit" className="w-1 h-1" tabIndex={-1} />
      </form>
    </div>
  </div>)
}

export default Globals
