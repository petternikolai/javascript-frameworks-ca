import { Typography, Badge } from "@mui/joy";
import Nav from "./Nav";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  return (
    <header>
      <Typography level="h1" component="h1">
        Ecommerce
      </Typography>
      <div className="cart-icon-container">
        <Badge badgeContent={1}>
          <ShoppingCartIcon sx={{ fontSize: 28 }} className="cart-icon" />
        </Badge>
      </div>
      <Nav />
    </header>
  );
}
