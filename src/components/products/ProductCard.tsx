import {
  Card,
  CardContent,
  Typography,
  AspectRatio,
  Chip,
  Stack,
  Box,
} from "@mui/joy";
import { ApiProduct } from "../../types/api";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface ProductCardProps {
  product: ApiProduct;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      {[...Array(5)].map((_, index) =>
        index < Math.floor(rating) ? (
          <StarIcon key={index} color="warning" fontSize="small" />
        ) : (
          <StarBorderIcon key={index} color="warning" fontSize="small" />
        )
      )}
    </Stack>
  );
};

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/product/${product.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <Card variant="outlined" sx={{ height: "100%" }}>
        <AspectRatio ratio="4/3">
          <img
            src={product.image.url}
            alt={product.image.alt || product.title}
            loading="lazy"
          />
        </AspectRatio>
        <CardContent>
          <Typography level="title-md">{product.title}</Typography>
          <Typography level="body-sm" noWrap>
            {product.description}
          </Typography>
          <Stack direction="row" spacing={1} mt={1}>
            <Typography level="body-md" fontWeight="bold">
              ${product.discountedPrice.toFixed(2)}
            </Typography>
            {product.discountedPrice < product.price && (
              <Typography
                level="body-md"
                sx={{ textDecoration: "line-through" }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            )}
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
            <StarRating rating={product.rating} />
            <Typography level="body-sm">
              ({product.rating.toFixed(1)})
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {product.tags.map((tag) => (
              <Chip key={tag} size="sm" variant="soft">
                {tag}
              </Chip>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
