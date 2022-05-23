import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from "react";
import useStore from "@/helpers/store";

const schema = yup.object({
  label: yup.string().required().max(64)
})

type ItemPropertiesData = {
  label: string;
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
  const { label } = selectedItem
  const { register, handleSubmit, formState: { isValid, isDirty, errors }, setValue } = useForm<ItemPropertiesData>({
    resolver: yupResolver(schema),
    mode: "onBlur"
  });
  const onSubmit = handleSubmit(data => {
    if (isValid && isDirty) {
      console.log('to store', data)
      patchItem(selectedKey, { ...selectedItem, ...data })
    }
  });

  useEffect(() => {
    setValue('label', label)
  }, [label])

  return (
    <form
      onSubmit={onSubmit}
      onBlur={onSubmit}>
      <ProperyRow label="label" hasError={typeof errors.label === 'undefined'} errorMessage={errors.label?.message}>
        <input
          {...register("label")}
          defaultValue={label}
          className={`
            text-xs text-white w-56 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent
          focus:border-gray-900 focus:bg-slate-800 
           ${errors.label && 'focus:bg-red-900'}`} />
      </ProperyRow>
    </form>
  )
}

export default ItemProperties
