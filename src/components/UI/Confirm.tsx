import Button from "./Button"
import Modal from "./Modal"

type Props = { text: string, onCancel: () => void, onConfirm: () => void }

export default function Confirm({ text, onCancel, onConfirm }: Props) {
  return (
    <Modal onCancel={onCancel}>
      <p className="mb-4 font-semibold">{ text }</p>

      <div className="flex justify-between w-full">
        <Button text="Confirm" type="button" color="primary" onClick={onConfirm} />
        <Button text="Cancel" type="button" color="secondary" onClick={onCancel} />
      </div>
    </Modal>
  )
}