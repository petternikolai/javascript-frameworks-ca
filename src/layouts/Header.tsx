import { Typography, Badge, IconButton } from "@mui/joy";
import Nav from "./Nav";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function Header() {
  const cartContext = useContext(CartContext);
  const itemCount = cartContext?.cart.reduce(
    (count: number, item: { quantity: number }) => count + item.quantity,
    0
  );

  return (
    <>
      <header>
        <Typography level="h2" component="h2">
          <Link to="/" className="logo">
            ReactCart
          </Link>
        </Typography>
        <div className="cart-icon-container">
          <IconButton aria-label="Shopping Cart" component={Link} to="/cart">
            <Badge badgeContent={itemCount}>
              <ShoppingCartIcon sx={{ fontSize: 28 }} className="cart-icon" />
            </Badge>
          </IconButton>
        </div>
        <Nav />
      </header>
      <hr className="header-divider" />
    </>
  );
}
