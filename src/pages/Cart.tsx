import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  List,
  ListItem,
  Typography,
  IconButton,
  Input,
  Snackbar,
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../hooks/useCart";
import { CartItem } from "../types/cart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateCart, clearCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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
      setSnackbarOpen(true);
      return;
    }
    clearCart();
    navigate("/checkout-success");
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 2 }}>
      <Card variant="outlined" sx={{ p: 3 }}>
        <Typography level="h1" component="h1">
          Your Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography level="body-md">Your cart is empty</Typography>
        ) : (
          <List>
            {cart.map((item: CartItem) => (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {item.title} - ${(item.price * item.quantity).toFixed(2)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    sx={{ width: 50, mx: 1 }}
                    slotProps={{ input: { min: 0 } }}
                  />
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemoveFromCart(item.id)}
                    color="danger"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        <Divider sx={{ my: 2 }} />
        <Typography level="h2" component="p" sx={{ mb: 2 }}>
          Total: ${totalAmount.toFixed(2)}
        </Typography>
        <Button variant="solid" color="primary" onClick={clearCart} fullWidth>
          Clear Cart
        </Button>
        <Button
          variant="solid"
          color="success"
          onClick={checkout}
          fullWidth
          sx={{ mt: 2 }}
        >
          Checkout
        </Button>
      </Card>
      <Snackbar
        variant="solid"
        color="warning"
        autoHideDuration={3000}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        Your cart is empty
      </Snackbar>
    </Box>
  );
}
