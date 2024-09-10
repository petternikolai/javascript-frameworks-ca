import {
  Card,
  CardContent,
  Typography,
  AspectRatio,
  Chip,
  Stack,
} from "@mui/joy";
import { ApiProduct } from "../../types/api";

interface ProductItemProps {
  product: ApiProduct;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
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
            <Typography level="body-md" sx={{ textDecoration: "line-through" }}>
              ${product.price.toFixed(2)}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={1} mt={1} mb={1}>
          <Typography level="body-sm">
            Rating: {product.rating.toFixed(1)}/5
          </Typography>
          <Typography level="body-sm">
            ({product.reviews.length} reviews)
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
  );
}
