import { TableCell, Typography } from "@mui/material";

type Props = {
  text: string;
  isHeader: boolean;
  isInventory: boolean;
};

const CustomTableCell = ({ text, isHeader, isInventory }: Props) => {
  return (
    <TableCell>
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
