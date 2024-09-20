import {
  Card,
  CardContent,
  Typography,
  AspectRatio,
  Chip,
  Stack,
  Box,
  Button,
  IconButton,
} from "@mui/joy";
import { ApiProduct } from "../../types/api";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartItemCardProps {
  product: ApiProduct;
  quantity: number;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const StarRating = ({ rating }: { rating: number }) => (
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

export default function CartItemCard({
  product,
  quantity,
  onRemove,
  onQuantityChange,
}: CartItemCardProps) {
  // Ensure product is defined and has a url property
  const productUrl = product?.image?.url || "default-url";

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AspectRatio ratio="4/3" sx={{ width: 100, marginRight: 2 }}>
            <img
              src={productUrl}
              alt={product?.title || "Product"}
              loading="lazy"
            />
          </AspectRatio>
          <Box sx={{ flex: 1 }}>
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
            <Stack direction="row" spacing={1} alignItems="center" mt={2}>
              <Button
                variant="outlined"
                onClick={() => onQuantityChange(product.id, quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <Typography level="body-md" sx={{ marginX: 2 }}>
                {quantity}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => onQuantityChange(product.id, quantity + 1)}
              >
                +
              </Button>
            </Stack>
          </Box>
          <IconButton
            color="danger"
            onClick={() => onRemove(product.id)}
            sx={{ marginLeft: 2 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
