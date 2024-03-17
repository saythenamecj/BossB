import accessories from "../../assets/images/Categories/phone.png";
import parts from "../../assets/images/Categories/fashion.png";
import stickers from "../../assets/images/Categories/electronics.png";
import liquids from "../../assets/images/Categories/home.png";

import { Link } from "react-router-dom";

const catNav = [
  {
    name: "Accessories",
    icon: accessories,
  },
  {
    name: "Parts",
    icon: parts,
  },
  {
    name: "Stickers",
    icon: stickers,
  },
  {
    name: "Liquids",
    icon: liquids,
  },
];

const Categories = () => {
  return (
    <section className="hidden sm:block bg-white mt-10 mb-4 min-w-full px-12 py-1 shadow overflow-hidden">
      <div className="flex items-center justify-between mt-4">
        {catNav.map((item, i) => (
          <Link
            to={`/products?category=${item.name}`}
            className="flex flex-col gap-1 items-center p-2 group"
            key={i}
          >
            <div className="h-16 w-16">
              <img
                draggable="false"
                className="h-full w-full object-contain"
                src={item.icon}
                alt={item.name}
              />
            </div>
            <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
