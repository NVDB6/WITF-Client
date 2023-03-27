import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { FoodItems } from "../utils/FoodItems";
import {
  ActionListType,
  ActionType,
  InventoryType,
  ItemType,
} from "../utils/types";
import "./CustomTable.css";
import CustomTableCell from "./CustomTableCell";
import CustomTableRow from "./CustomTableRow";

type Props = {
  title: string;
  headers: Array<string>;
  items: ActionListType | InventoryType;
};

const CustomTable = ({ title, headers, items }: Props) => {
  const isInventory = title === "Fridge Inventory";

  const getExpiration = (id: string) =>
    (
      FoodItems as {
        [id: string]: { name: string; expiration: number };
      }
    )[items[id].itemName].expiration -
    (new Date().getDate() - items[id].dateBought.getDate());

  return (
    <div
      key={title}
      className={`table-container ${
        isInventory ? "primary-bg" : "secondary-bg"
      }`}
    >
      <Toolbar style={{ height: "10%" }}>
        <Typography
          sx={{ flex: "1 1 100%", fontWeight: 500, margin: "20px 0 10px" }}
          variant="h2"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      </Toolbar>
      <TableContainer style={{ maxHeight: "90%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              className={
                !isInventory ? "table-row-primary" : "table-row-secondary"
              }
            >
              {headers.map((header) => (
                <CustomTableCell
                  key={header}
                  text={header}
                  isHeader={true}
                  isInventory={isInventory}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(items)
              .sort((a, b) =>
                isInventory
                  ? getExpiration(a) - getExpiration(b)
                  : parseInt(b) - parseInt(a)
              )
              .map((id) => (
                <CustomTableRow
                  key={id}
                  isInventory={isInventory}
                  item={items[id] as ActionType & ItemType}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
