import { TableRow } from "@mui/material";
import CustomTableCell from "./CustomTableCell";
import { ActionType, ItemType } from "../types";
import { FoodItems } from "../FoodItems";

type Props = {
  isInventory: boolean;
  item: ActionType & ItemType;
};

const CustomTableRow = ({ isInventory, item }: Props) => {
  const { timeAction, itemName, dateBought, imageUrl, intoFridge } = item;
  if (isInventory)
    return (
      <TableRow
        className={!isInventory ? "table-row-primary" : "table-row-secondary"}
      >
        <CustomTableCell
          text={
            (
              FoodItems as {
                [id: string]: { name: string; expiration: number; icon: any };
              }
            )[itemName].icon
          }
          isHeader={false}
          isInventory={isInventory}
        />
        <CustomTableCell
          text={
            (
              FoodItems as {
                [id: string]: { name: string; expiration: number };
              }
            )[itemName].name
          }
          isHeader={false}
          isInventory={isInventory}
        />
        <CustomTableCell
          text={(
            (
              FoodItems as {
                [id: string]: { name: string; expiration: number };
              }
            )[itemName].expiration -
            (new Date().getDate() - dateBought.getDate())
          ).toString()}
          isHeader={false}
          isInventory={isInventory}
        />
      </TableRow>
    );
  return (
    <TableRow
      className={!isInventory ? "table-row-primary" : "table-row-secondary"}
    >
      <CustomTableCell
        text={timeAction.toString().split(" ").slice(1, 5).join(" ")}
        isHeader={false}
        isInventory={isInventory}
      />
      <CustomTableCell
        text={<img src={imageUrl} alt="" className="item-image" />}
        isHeader={false}
        isInventory={isInventory}
      />
      <CustomTableCell
        text={
          (
            FoodItems as {
              [id: string]: { name: string; expiration: number };
            }
          )[itemName].name
        }
        isHeader={false}
        isInventory={isInventory}
      />
      <CustomTableCell
        text={dateBought.toString().split(" ").slice(1, 5).join(" ")}
        isHeader={false}
        isInventory={isInventory}
      />
      <CustomTableCell
        text={intoFridge ? "In" : "Out"}
        isHeader={false}
        isInventory={isInventory}
      />
    </TableRow>
  );
};

export default CustomTableRow;
