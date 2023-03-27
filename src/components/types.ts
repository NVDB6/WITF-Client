import { ReactElement } from "react";

type ActionType = {
  itemName: string;
  intoFridge: boolean;
  timeAction: Date;
  dateBought: Date;
};
type ActionListType = { [id: string]: ActionType };

type ItemType = { itemName: string; dateBought: Date };
type InventoryType = { [id: string]: ItemType };

type FoodItemsType = {
  [id: string]: {
    name: string;
    expiration: number;
    icon: ReactElement<any, any>;
  };
};

export {
  type ActionType,
  type ActionListType,
  type ItemType,
  type InventoryType,
  type FoodItemsType,
};
