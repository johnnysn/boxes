import { useContext } from "react"
import { Box } from "../models/box.model"
import BoxViewShort from "./BoxViewShort"
import BoxesContextType from "../context/boxes-context.type"
import { BoxesContext } from "../context/boxes-context"

type Props = { boxes: Box[] }

export default function Boxes({ boxes }: Props) {
  const { removeBox } = useContext<BoxesContextType>(BoxesContext);

  const removeHandler = (box: Box) => {
    removeBox(box.id);
  }

  return (
    <div className="flex flex-row flex-wrap md:justify-start justify-center gap-4 max-w-screen-lg">
      { boxes.map((box, index) => <BoxViewShort key={index} box={box} onRemove={() => removeHandler(box)} /> ) }
    </div>
  )
}