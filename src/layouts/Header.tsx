import { Typography, Badge, IconButton, Switch } from "@mui/joy";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import Nav from "./Nav";
import { useColorScheme } from "@mui/joy/styles";

export default function Header() {
  const cartContext = useContext(CartContext);
  const itemCount = cartContext?.cart.reduce(
    (count: number, item: { quantity: number }) => count + item.quantity,
    0
  );

  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <>
      <header>
        <Typography level="h2" component="h2">
          <Link to="/" className="logo">
            ReactCart.
          </Link>
        </Typography>
        <div className="header-right-side-content">
          <nav className="desktop-nav">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              })}
              className="nav-link"
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              style={({ isActive }) => ({
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              })}
              className="nav-link"
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => ({
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              })}
              className="nav-link"
            >
              About
            </NavLink>
            <Switch
              startDecorator={<LightModeIcon />}
              endDecorator={<DarkModeIcon />}
              checked={mode === "dark"}
              onChange={handleThemeToggle}
              sx={{ ml: 2, mr: 2 }} // Add margin to the switch
            />
          </nav>
          <div className="cart-icon-container">
            <IconButton aria-label="Shopping Cart" component={Link} to="/cart">
              <Badge badgeContent={itemCount}>
                <ShoppingCartIcon sx={{ fontSize: 28 }} className="cart-icon" />
              </Badge>
            </IconButton>
          </div>
          <div className="mobile-nav">
            <Nav />
          </div>
        </div>
      </header>
      <hr className="header-divider" />
    </>
  );
}
