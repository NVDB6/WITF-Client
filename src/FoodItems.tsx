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
import { FoodItemsType } from "./components/types";

const FoodItems: FoodItemsType = {
  Apple: {
    name: "Apple",
    expiration: 25,
    icon: <GiShinyApple />,
  },
  Avocado: {
    name: "Avocado",
    expiration: 4,
    icon: <GiAvocado />,
  },
  Banana: {
    name: "Banana",
    expiration: 8,
    icon: <GiBanana />,
  },
  Beef: {
    name: "Beef",
    expiration: 4,
    icon: <GiMeat />,
  },
  Bell_pepper: {
    name: "Bell pepper",
    expiration: 11,
    icon: <GiBellPepper />,
  },
  Container: {
    name: "Container",
    expiration: -1,
    icon: <BiDish />,
  },
  Ketchup: {
    name: "Ketchup",
    expiration: 365,
    icon: <GiKetchup />,
  },
  Milk: {
    name: "Milk",
    expiration: 5,
    icon: <GiMilkCarton />,
  },
  Orange: {
    name: "Orange",
    expiration: 25,
    icon: <GiOrange />,
  },
  Yogurt: {
    name: "Yogurt",
    expiration: 11,
    icon: <BsTrash2Fill />,
  },
};

export { FoodItems };
