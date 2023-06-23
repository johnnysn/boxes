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
    <div className="py-2 px-2">

      <BoxView box={box!} onEdit={boxEditHandler} onRemove={boxRemoveHandler} full={true} />

      <div className="flex justify-center w-full mt-4">
        <ReturnButton />
      </div>
    </div>
  )
}