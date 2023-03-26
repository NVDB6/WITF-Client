import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { ActionListType, ActionType, InventoryType, ItemType } from "./types";
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
  return (
    <div
      key={title}
      className={`table-container ${
        isInventory ? "primary-bg" : "secondary-bg"
      }`}
    >
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%", fontWeight: 500 }}
          variant="h2"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table aria-label="simple table">
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
            {Object.keys(items).map((id) => (
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
