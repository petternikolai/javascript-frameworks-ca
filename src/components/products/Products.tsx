import { Grid, Container, CircularProgress, Box } from "@mui/joy";
import ProductItem from "./ProductItem";
import useApi from "../../hooks/useApi";
import { ApiProduct, ApiResponse } from "../../types/api";

interface ProductsProps {
  filter: string;
  renderProduct: (product: ApiProduct) => React.ReactNode;
}

const Products: React.FC<ProductsProps> = ({ filter, renderProduct }) => {
  const { data, isLoading, error } = useApi<ApiResponse<ApiProduct[]>>(
    "https://v2.api.noroff.dev/online-shop"
  );

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Error: {error}</div>;

  const filteredProducts = data?.data?.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {filteredProducts?.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
            {renderProduct(product)}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
