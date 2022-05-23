import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from "react";
import useStore from "@/helpers/store";

const schema = yup.object({
  label: yup.string().required().max(64),
  url: yup.string(),
  px: yup.number(),
  py: yup.number(),
  pz: yup.number(),
  rx: yup.number(),
  ry: yup.number(),
  rz: yup.number(),
  scale: yup.number().positive()
})

type ItemPropertiesData = {
  label: string;
  url: string;
  px: number;
  py: number;
  pz: number;
  rx: number;
  ry: number;
  rz: number;
  scale: number;
}

interface PropertyRowProps {
  label: String
  children: React.ReactNode
  hasError: boolean
  errorMessage: string | undefined
}

const ProperyRow = (props: PropertyRowProps) => {
  const { label, children, hasError, errorMessage } = props
  return (<div className="flex flex-row text-xs py-1 md:py-2 px-2">
    <div className="w-20 p-1">
      <span>{label}</span>
    </div>
    <div className="w-34">
      {children}
    </div>
    {hasError && <div className="w-80">{errorMessage}</div>}
  </div>)
}

const ItemProperties = () => {
  const selectedKey = useStore(state => state.selectedItemKey)
  const items = useStore(state => state.scene.items)
  const patchItem = useStore(state => state.patchSceneItem)
  const selectedItem = items[selectedKey]
  const { label, url, position, rotation, scale } = selectedItem
  const { register, handleSubmit, formState: { isValid, isDirty, errors }, setValue } = useForm<ItemPropertiesData>({
    resolver: yupResolver(schema),
    mode: "onBlur"
  });
  const onSubmit = handleSubmit(data => {
    if (isValid && isDirty) {
      console.log('to store', data)
      patchItem(selectedKey,
        {
          ...selectedItem,
          ...data,
          position: [data.px, data.py, data.pz],
          rotation: [data.rx, data.ry, data.rz]
        })
    }
  });

  useEffect(() => {
    setValue('label', label)
    setValue('url', url)
    setValue('px', position[0])
    setValue('py', position[1])
    setValue('pz', position[2])
    setValue('rx', rotation[0])
    setValue('ry', rotation[1])
    setValue('rz', rotation[2])
    setValue('scale', scale)
  }, [label, url, position, rotation])

  return (
    <form
      onSubmit={onSubmit}
      onBlur={onSubmit}>
      <ProperyRow label="label" hasError={typeof errors.label !== 'undefined'} errorMessage={errors.label?.message}>
        <input
          {...register("label")}
          defaultValue={label}
          className={`
            text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent
          focus:border-gray-900 focus:bg-slate-800 
           ${errors.label && 'focus:bg-red-900'}`} />
      </ProperyRow>
      <ProperyRow label="url" hasError={typeof errors.url !== 'undefined'} errorMessage={errors.url?.message}>
        <input
          {...register("url")}
          defaultValue={url}
          className={`
            text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent
          focus:border-gray-900 focus:bg-slate-800 
           ${errors.url && 'focus:bg-red-900'}`} />
      </ProperyRow>
      <ProperyRow
        label="Position"
        hasError={
          typeof errors.px !== 'undefined' ||
          typeof errors.py !== 'undefined' ||
          typeof errors.pz !== 'undefined'
        }
        errorMessage={
          errors.px?.message ||
          errors.py?.message ||
          errors.pz?.message
        }>
        <input
          {...register("px")}
          defaultValue={0}
          className={`
            text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent
          focus:border-gray-900 focus:bg-slate-800 
           ${errors.px && 'focus:bg-red-900'}`} />
        <input
          {...register("py")}
          defaultValue={0}
          className={`
            text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent
          focus:border-gray-900 focus:bg-slate-800 
           ${errors.py && 'focus:bg-red-900'}`} />
        <input
          {...register("pz")}
          defaultValue={0}
          className={`
            text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent
          focus:border-gray-900 focus:bg-slate-800 
           ${errors.pz && 'focus:bg-red-900'}`} />
      </ProperyRow>
      <ProperyRow
        label="Rotation"
        hasError={
          typeof errors.rx !== 'undefined' ||
          typeof errors.ry !== 'undefined' ||
          typeof errors.rz !== 'undefined'
        }
        errorMessage={
          errors.rx?.message ||
          errors.ry?.message ||
          errors.rz?.message
        }>
        <input
          {...register("rx")}
          defaultValue={0}
          className={`
            text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent
          focus:border-gray-900 focus:bg-slate-800 
           ${errors.rx && 'focus:bg-red-900'}`} />
        <input
          {...register("ry")}
          defaultValue={0}
          className={`
            text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent
          focus:border-gray-900 focus:bg-slate-800 
           ${errors.ry && 'focus:bg-red-900'}`} />
        <input
          {...register("rz")}
          defaultValue={0}
          className={`
            text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent
          focus:border-gray-900 focus:bg-slate-800 
           ${errors.rz && 'focus:bg-red-900'}`} />
      </ProperyRow>
      <ProperyRow label="Scale" hasError={typeof errors.scale !== 'undefined'} errorMessage={errors.scale?.message}>
        <input
          {...register("scale")}
          defaultValue={scale}
          className={`
            text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent
          focus:border-gray-900 focus:bg-slate-800 
           ${errors.scale && 'focus:bg-red-900'}`} />
      </ProperyRow>
    </form>
  )
}

export default ItemProperties
