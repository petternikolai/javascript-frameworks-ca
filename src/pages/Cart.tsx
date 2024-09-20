import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  Select,
  Option,
} from "@mui/joy";
import { useCart } from "../hooks/useCart";
import { CartItem } from "../types/cart";
import { useNavigate } from "react-router-dom";
import { Link as MuiLink } from "@mui/joy";
import React from "react";

export default function Cart() {
  const { cart, updateCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const handleRemoveFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const checkout = () => {
    if (cart.length === 0) {
      return;
    }
    clearCart();
    navigate("/checkout-success");
  };

  return (
    <Box sx={{ maxWidth: "1000px", margin: "auto", p: 2 }}>
      {cart.length === 0 ? (
        <Box>
          <Typography level="h1">Your cart is empty.</Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2, width: "100%", height: "50px", borderRadius: "15px" }}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <Typography level="h1" component="h1">
            Your Cart.
          </Typography>
          <hr className="cart-divider" />
          <List>
            {cart.map((item: CartItem, index: number) => (
              <React.Fragment key={item.id}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      flexShrink: 0,
                      overflow: "hidden",
                      borderRadius: 1,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                      }}
                    />
                  </Box>
                  <Typography level="h4" sx={{ alignSelf: "flex-start" }}>
                    {item.title}
                  </Typography>
                  <Box
                    alignItems="center"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Select
                        value={item.quantity}
                        onChange={(_, newValue) =>
                          handleQuantityChange(item.id, Number(newValue))
                        }
                        sx={{ width: 80 }}
                      >
                        {[...Array(100)].map((_, i) => (
                          <Option key={i + 1} value={i + 1}>
                            {i + 1}
                          </Option>
                        ))}
                      </Select>
                    </Box>
                    <Typography level="body-md">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography
                    onClick={() => handleRemoveFromCart(item.id)}
                    color="danger"
                    sx={{ alignSelf: "flex-end" }}
                  >
                    <MuiLink>Remove</MuiLink>
                  </Typography>
                </ListItem>
                {index < cart.length - 1 && <hr className="cart-divider" />}
              </React.Fragment>
            ))}
          </List>
          <hr className="cart-divider" />
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography level="body-md">Subtotal:</Typography>
              <Typography level="body-md">${totalAmount.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography level="body-md">Shipping:</Typography>
              <Typography level="body-md">FREE</Typography>
            </Box>
            <hr className="cart-divider-less-margin" />
            <Typography level="h3">Total: ${totalAmount.toFixed(2)}</Typography>
            <Button
              variant="solid"
              color="primary"
              onClick={checkout}
              fullWidth
              sx={{ mt: 2 }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
