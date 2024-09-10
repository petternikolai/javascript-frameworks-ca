import { Typography, Badge, IconButton } from "@mui/joy";
import Nav from "./Nav";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  return (
    <header>
      <Typography level="h2" component="h2">
        Ecommerce
      </Typography>
      <div className="cart-icon-container">
        <IconButton aria-label="Shopping Cart">
          <Badge badgeContent={1}>
            <ShoppingCartIcon sx={{ fontSize: 28 }} className="cart-icon" />
          </Badge>
        </IconButton>
      </div>
      <Nav />
    </header>
  );
}
