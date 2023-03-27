import {
  GiAvocado,
  GiBanana,
  GiBellPepper,
  GiKetchup,
  GiMeat,
  GiMilkCarton,
  GiOrange,
  GiShinyApple,
} from "react-icons/gi";
import { BsTrash2Fill } from "react-icons/bs";
import { BiDish } from "react-icons/bi";
import { FoodItemsType } from "./types";

const FoodItems: FoodItemsType = {
  Apple: {
    name: "Apple",
    expiration: 25,
    icon: <GiShinyApple size={70} />,
  },
  Avocado: {
    name: "Avocado",
    expiration: 4,
    icon: <GiAvocado size={70} />,
  },
  Banana: {
    name: "Banana",
    expiration: 8,
    icon: <GiBanana size={70} />,
  },
  Beef: {
    name: "Beef",
    expiration: 4,
    icon: <GiMeat size={70} />,
  },
  Bell_pepper: {
    name: "Bell pepper",
    expiration: 11,
    icon: <GiBellPepper size={70} />,
  },
  Container: {
    name: "Container",
    expiration: -1,
    icon: <BiDish size={70} />,
  },
  Ketchup: {
    name: "Ketchup",
    expiration: 365,
    icon: <GiKetchup size={70} />,
  },
  Milk: {
    name: "Milk",
    expiration: 5,
    icon: <GiMilkCarton size={70} />,
  },
  Orange: {
    name: "Orange",
    expiration: 25,
    icon: <GiOrange size={70} />,
  },
  Yogurt: {
    name: "Yogurt",
    expiration: 11,
    icon: <BsTrash2Fill size={70} />,
  },
};

export { FoodItems };
