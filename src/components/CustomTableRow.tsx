import { TableRow } from "@mui/material";
import CustomTableCell from "./CustomTableCell";
import { ActionType, ItemType } from "../utils/types";
import { FoodItems } from "../utils/FoodItems";
import { FaTrash } from "react-icons/fa";

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
        text={intoFridge ? "In" : "Out"}
        isHeader={false}
        isInventory={isInventory}
      />
      <CustomTableCell
        text={timeAction.getTime() === dateBought.getTime() ? "New" : "Same"}
        isHeader={false}
        isInventory={isInventory}
      />
      <CustomTableCell
        text={
          <button className="delete-button">
            <FaTrash color="white" size={30} />
          </button>
        }
        isHeader={false}
        isInventory={isInventory}
      />
    </TableRow>
  );
};

export default CustomTableRow;
