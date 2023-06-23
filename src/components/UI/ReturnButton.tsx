import { useNavigate } from 'react-router-dom';
import returnIcon from '../../assets/return.svg';

type Props = {
  onClick ?: () => void
}

export default function ReturnButton({ onClick }: Props) {
  const navigate = useNavigate();

  const returnClickHandler = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      className="bg-secondary hover:bg-orange-300 border-b-2 border-b-secondary text-customdark rounded font-bold py-2 w-[140px] flex items-center justify-center gap-2 transition-colors duration-300"
      type={'button'}
      onClick={returnClickHandler}
    >
      <img src={returnIcon} className='w-[25px]' />
      <span className='text-lg'>Return</span>
    </button>
  )
}