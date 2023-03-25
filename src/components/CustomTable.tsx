import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { ActionListType, ActionType, InventoryType } from "./types";

type Props = {
  title: string;
  headers: Array<string>;
  items: ActionListType | InventoryType;
};

const CustomTable = ({ title, headers, items }: Props) => {
  const isInventory = title === "Fridge Inventory";
  return (
    <div className="table-container">
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(items).map((key) => (
              <TableRow key={key}>
                {!isInventory && (
                  <TableCell>
                    {(items[key] as ActionType).timeAction
                      .toString()
                      .split(" ")
                      .slice(0, 5)
                      .join(" ")}
                  </TableCell>
                )}
                <TableCell>{items[key].itemName}</TableCell>
                <TableCell>{items[key].dateBought?.toDateString()}</TableCell>
                {isInventory ? (
                  <TableCell>{"5"}</TableCell>
                ) : (
                  <TableCell>
                    {(items[key] as ActionType).intoFridge ? "In" : "Out"}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
