import useStore from "@/helpers/store"
import { useForm } from "react-hook-form";

type GlobalsData = {
  name: string;
  description: string;
  background: string;
}

const Globals = () => {
  const setSceneGlobals = useStore(s => s.setSceneGlobals)
  const [name, description, background] = useStore(s => [s.scene.name, s.scene.description, s.scene.backgroundcolor])
  const { register, handleSubmit, formState: { errors } } = useForm<GlobalsData>();
  const onSubmit = handleSubmit(data => { console.log(data); setSceneGlobals(data.name, data.description, data.background) });
  return (<div>
    <h3>Globals</h3>
    <div>
      <form onSubmit={onSubmit}>
        <div className="">
          <label className="inline-block w-20 text-xs py-1 md:py-2 px-2">Background</label>
          <input {...register("background")} defaultValue={background} type="color" className='text-xs text-white w-16 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent focus:border-gray-900 focus:bg-slate-800' />
        </div>
        <div className="">
          <label className="inline-block w-20 text-xs py-1 md:py-2 px-2">Name</label>
          <input {...register("name")} defaultValue={name} className='text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent focus:border-gray-900 focus:bg-slate-800' />
        </div>
        <div className="">
          <label className="inline-block w-20 text-xs py-1 md:py-2 px-2">Description</label>
          <input {...register("description")} defaultValue={description} className='text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent focus:border-gray-900 focus:bg-slate-800' />
        </div>
        <div>
          <button type="submit" value="Submit">Submit</button>
        </div>
      </form>
    </div>
  </div>)
}

export default Globals
