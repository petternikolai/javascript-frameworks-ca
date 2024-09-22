import { Grid, Container, CircularProgress, Box } from "@mui/joy";
import useApi from "../../hooks/useApi";
import { ApiProduct, ApiResponse } from "../../types/api";
import { Typography } from "@mui/joy";

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
    <Container disableGutters>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts?.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
              {renderProduct(product)}
            </Grid>
          ))
        ) : (
          <Grid xs={12}>
            <Typography>No products found</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Products;
