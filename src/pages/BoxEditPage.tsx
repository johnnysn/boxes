import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoxEdit from '../components/BoxEdit';
import BoxesContextType from '../context/boxes-context.type';
import { BoxesContext } from '../context/boxes-context';
import { IBox } from '../models/box.model';

type Props = {};

export default function BoxEditPage({}: Props) {
  const { id } = useParams();
  const ctx = useContext<BoxesContextType>(BoxesContext);
  const navigate = useNavigate();

  const boxData = ctx.getById(id!);

  const closeHandler = () => {
    navigate(-1);
  };
  const submitHandler = (data: IBox) => {
    if (id) ctx.updateBox(id, data);
  };

  return (
    <div className="py-2 px-2 flex justify-center">
      <BoxEdit
        boxDataIn={boxData}
        onSubmit={submitHandler}
        onClose={closeHandler}
      />
    </div>
  );
}
