import { useParams } from "react-router-dom";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import useApi from "../hooks/useApi";
import { ApiProduct } from "../types/api";
import { useCart } from "../hooks/useCart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ApiResponse {
  data: ApiProduct;
  meta: Record<string, unknown>;
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const {
    data: response,
    error,
    isLoading,
  } = useApi<ApiResponse>(`https://v2.api.noroff.dev/online-shop/${id}`);
  const { cart, addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cart.some((item) => item.id === id)) {
      setIsAdded(true);
    }
  }, [cart, id]);

  if (isLoading) return <Typography level="h2">Loading...</Typography>;
  if (error) return <Typography level="h2">Error: {error}</Typography>;
  if (!response) return <Typography level="h2">No product found</Typography>;

  const product = response.data;

  const discount = product.price - product.discountedPrice;
  const discountPercentage = ((discount / product.price) * 100).toFixed(0);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.discountedPrice,
      quantity: 1,
      image: product.image.url,
    });
    setIsAdded(true);
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <Stack direction="row" spacing={0.5}>
        {[...Array(5)].map((_, index) =>
          index < Math.floor(rating) ? (
            <StarIcon key={index} color="warning" />
          ) : (
            <StarBorderIcon key={index} color="warning" />
          )
        )}
      </Stack>
    );
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", p: 2 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        {<ArrowBackIcon />} Go Back
      </Button>
      <Card variant="outlined">
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <AspectRatio ratio="1" objectFit="cover">
              <img
                src={product.image.url}
                alt={product.image.alt || product.title}
                loading="lazy"
              />
            </AspectRatio>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography level="h2" component="h1" sx={{ mb: 2 }}>
                {product.title}
              </Typography>
              <Typography level="body-md" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <StarRating rating={product.rating} />
                <Typography level="body-sm">
                  ({product.rating.toFixed(1)})
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {product.tags.map((tag) => (
                  <Chip key={tag} variant="soft" color="neutral">
                    {tag}
                  </Chip>
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography level="h4" component="span">
                  ${product.discountedPrice.toFixed(2)}
                </Typography>
                {discount > 0 && (
                  <Box>
                    <Typography
                      level="body-sm"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Chip color="danger" variant="soft">
                      {discountPercentage}% OFF
                    </Chip>
                  </Box>
                )}
              </Box>
              <Button
                fullWidth
                variant="solid"
                color={isAdded ? "success" : "primary"}
                onClick={handleAddToCart}
                disabled={isAdded}
                sx={{ mb: 2 }}
              >
                {isAdded ? "Already in Cart" : "Add to Cart"}
              </Button>
            </Box>
          </Grid>
        </Grid>
        {product.reviews && product.reviews.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography level="h3" sx={{ mb: 2 }}>
              Reviews
            </Typography>
            <Grid container spacing={2}>
              {product.reviews.map((review, index) => (
                <Grid key={index} xs={12} sm={6} md={4}>
                  <Card
                    variant="outlined"
                    sx={{ height: "100%", bgcolor: "background.level1" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Avatar
                        src={`https://i.pravatar.cc/40?img=${index}`}
                        sx={{ mr: 2 }}
                      />
                      <Typography level="body-md" fontWeight="bold">
                        {review.username}
                      </Typography>
                    </Box>
                    <StarRating rating={review.rating} />
                    <Typography level="body-sm" sx={{ mt: 2 }}>
                      {review.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Card>
    </Box>
  );
}
