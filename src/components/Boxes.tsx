import { Box } from "../models/box.model"
import BoxViewShort from "./BoxViewShort"

type Props = { boxes: Box[] }

export default function Boxes({ boxes }: Props) {
  return (
    <div className="flex flex-row flex-wrap md:justify-start justify-center gap-4 max-w-screen-lg">
      { boxes.map((box, index) => <BoxViewShort key={index} box={box} /> ) }
    </div>
  )
}