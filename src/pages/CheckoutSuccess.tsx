import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/joy";

const CheckoutSuccess = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        padding: 3,
        height: "80vh",
      }}
    >
      <Typography level="h1" sx={{ mb: 2, textAlign: "center" }}>
        Order Successful!
      </Typography>
      <Typography level="body-md" sx={{ mb: 4, textAlign: "center" }}>
        Thank you for your purchase.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="solid"
        color="primary"
        size="md"
        sx={{ textAlign: "center" }}
      >
        Back to Store
      </Button>
    </Box>
  );
};

export default CheckoutSuccess;
