import { Typography } from "@mui/joy";
import Nav from "./Nav";

export default function Header() {
  return (
    <header>
      <Typography level="h1" component="h1">
        Ecommerce
      </Typography>
      <Nav />
    </header>
  );
}
