import { TableCell, Typography } from "@mui/material";

type Props = {
  text: any;
  isHeader: boolean;
  isInventory: boolean;
};

const CustomTableCell = ({ text, isHeader, isInventory }: Props) => {
  return (
    <TableCell style={{ backgroundColor: isInventory ? "#A9BD9A" : "#526C3F" }}>
      <Typography
        sx={{
          color: `#${!isInventory ? "A9BD9A" : "526C3F"}`,
          fontWeight: isHeader ? 600 : 400,
        }}
        variant="h4"
        component="div"
      >
        {text}
      </Typography>
    </TableCell>
  );
};

export default CustomTableCell;
