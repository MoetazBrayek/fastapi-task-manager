import { FC } from "react";


interface CardProps {
    item: {
      name: string;
    };
  }
  const Card: FC<CardProps> = ({ item }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src="https://via.placeholder.com/350x200" alt="Ranking" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.name}</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero,
                a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et.
              </p>
            </div>
          </div>
    )
}

export default Card;