import useStore from "@/helpers/store"
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type GlobalsData = {
  name: string;
  description: string;
  background: string;
}

const Globals = () => {
  const setSceneGlobals = useStore(s => s.setSceneGlobals)
  const [name, description, background] = useStore(s => [s.scene.name, s.scene.description, s.scene.backgroundcolor])
  const { register, handleSubmit, formState: { isValid, isDirty }, getValues, setValue } = useForm<GlobalsData>({
    mode: "onBlur"
  });
  // enter handler, need the hidden input
  const onSubmit = handleSubmit(data => {
    console.log('submit', isValid, isDirty, data)
    if (isValid && isDirty) {
      console.log('to store')
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
    <h3>Globals</h3>
    <div>
      <form
        onSubmit={onSubmit}
        onBlur={onSubmit}>
        <div className="">
          <label className="inline-block w-20 text-xs py-1 md:py-2 px-2">Background</label>
          <input {...register("background")} defaultValue={background} type="color" className='text-xs text-white w-16 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent focus:border-gray-900 focus:bg-slate-800' />
        </div>
        <div className="">
          <label className="inline-block w-20 text-xs py-1 md:py-2 px-2">Name</label>
          <input {...register("name", { required: true, maxLength: 20, minLength: 5 })} defaultValue={name} className='text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent focus:border-gray-900 focus:bg-slate-800' />
        </div>
        <div className="">
          <label className="inline-block w-20 text-xs py-1 md:py-2 px-2">Description</label>
          <input {...register("description")} defaultValue={description} className='text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent focus:border-gray-900 focus:bg-slate-800' />
        </div>
        <input type="submit" className="w-1 h-1" />
      </form>
    </div>
  </div>)
}

export default Globals
