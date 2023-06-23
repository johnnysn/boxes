import { useContext } from "react"
import BoxView from "../components/BoxView"
import BoxesContextType from "../context/boxes-context.type"
import { BoxesContext } from "../context/boxes-context";
import { useNavigate, useParams } from "react-router-dom";
import ReturnButton from "../components/UI/ReturnButton";

type Props = {}

export default function BoxPage({}: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctx = useContext<BoxesContextType>(BoxesContext);

  const box = ctx.getById(id!);
  const boxEditHandler = () => {
    navigate('edit');
  };
  const boxRemoveHandler = () => {
    navigate({
      pathname: '/',
      search: '?delete=' + box?.id
    });
  };

  return (
    <div className="py-2 px-2 flex flex-col gap-2">
      <div>
        <h2 className="font-bold text-lg text-gray-700">{ box?.label }</h2>

        <p className="text-gray-700">{ box?.description }</p>
      </div>

      <BoxView box={box!} onEdit={boxEditHandler} onRemove={boxRemoveHandler} full={true} />

      <div className="flex justify-center w-full mt-2">
        <ReturnButton />
      </div>
    </div>
  )
}