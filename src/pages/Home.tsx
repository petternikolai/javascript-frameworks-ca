import { useState } from "react";
import { Typography, Input, Box } from "@mui/joy";
import { Link } from "react-router-dom";
import Products from "../components/products/Products";
import ProductCard from "../components/products/ProductCard";
import { ApiProduct } from "../types/api";
import { HelmetProvider, Helmet } from "react-helmet-async";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <HelmetProvider>
      <Helmet>
        <title>Home - ReactCart</title>
      </Helmet>
      <Box sx={{ maxWidth: "1000px", margin: "auto", p: 2 }}>
        <Typography level="h1" component="h1" sx={{ mb: 2 }}>
          Products.
        </Typography>
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2, width: "100%" }}
        />
        <Products
          filter={searchTerm}
          renderProduct={(product: ApiProduct) => (
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ProductCard product={product} />
            </Link>
          )}
        />
      </Box>
    </HelmetProvider>
  );
}
