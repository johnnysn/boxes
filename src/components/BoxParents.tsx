import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '../models/box.model';

type Props = { box: Box; children: ReactNode };

export default function BoxParents({ box, children }: Props) {
  const parents: Box[] = [];
  let current = box.parent;
  while (current != null) {
    parents.push(current);
    current = current.parent;
  }

  parents.reverse();
  const stackParents = (index: number) => {
    const parent = parents[index];
    return (
      <div className="border-2 border-gray-700 rounded ">
        <div className="text-gray-700 mb-1 bg-orange-100 p-1">
          <Link to={`/box/${parent.id}`} >{parent.label}</Link>
        </div>
        <div className="p-2">
          {index < parents.length - 1 ? stackParents(index + 1) : children}
        </div>
      </div>
    );
  };

  return <>{parents.length > 0 ? stackParents(0) : children}</>;
}
