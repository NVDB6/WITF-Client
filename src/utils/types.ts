import { ReactElement } from "react";

type ActionType = {
  itemName: string;
  intoFridge: boolean;
  timeAction: Date;
  imageUrl: string;
  actionUid: string;
  dateBought: Date;
  foodConfidence: number;
  iihConfidence: number;
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
