import { TableRow } from "@mui/material";
import CustomTableCell from "./CustomTableCell";
import { ActionType, ItemType } from "../utils/types";
import { FoodItems } from "../utils/FoodItems";
import { FaTrash } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import { deleteObject, ref } from "firebase/storage";
import useExpiryCountdown from "../hooks/useExpiryCountdown";

type Props = {
  isInventory: boolean;
  item: ActionType & ItemType;
  id: string;
};

const CustomTableRow = ({ isInventory, item, id }: Props) => {
  const {
    timeAction,
    itemName,
    dateBought,
    imageUrl,
    intoFridge,
    actionUid,
    foodConfidence,
    iihConfidence,
  } = item;

  const handleDelete = () => {
    deleteDoc(doc(db, "fridge-items", id));
    deleteObject(ref(storage, `${id}.png`));
  };

  let expiryDate = new Date(dateBought);
  expiryDate.setDate(
    expiryDate.getDate() +
      (
        FoodItems as {
          [id: string]: { name: string; expiration: number };
        }
      )[itemName].expiration
  );
  const { expiryTime } = useExpiryCountdown(expiryDate);

  if (isInventory)
    return (
      <TableRow>
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
          text={expiryTime}
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
        text={`${Math.floor(foodConfidence * 100)}%`}
        isHeader={false}
        isInventory={isInventory}
      />
      <CustomTableCell
        text={
          <button className="delete-button" onClick={handleDelete}>
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
