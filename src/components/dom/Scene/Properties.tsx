import useStore from "@/helpers/store"
import GlobalProperies from './Globals'
import ItemProperties from './ItemProperties'

const Properties = () => {
  const selectedKey = useStore(state => state.selectedItemKey)

  // todo - replace with a switch once we have more props
  if (!selectedKey) {
    return (
      <GlobalProperies />
    )
  } else {
    return (
      <ItemProperties />
    )
  }
}

export default Properties
