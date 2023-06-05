import boxPlus from '../assets/box-plus.svg';

type Props = { onClick: () => void }

export default function AddBoxButton({ onClick }: Props) {
  return (
    <div>
      <button type="button" className="bg-secondary hover:bg-orange-300 border-b-2 border-b-secondary text-customdark rounded font-bold py-2 w-[200px] flex items-center justify-center gap-2 transition-colors duration-300" onClick={onClick}>
        <img src={boxPlus} className='w-[40px]' />
        <span className='text-lg'>Add Box</span>
      </button>
    </div>
  )
}