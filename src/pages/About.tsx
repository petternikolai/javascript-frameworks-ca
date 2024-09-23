import { Box, Typography, List, ListItem, ListItemContent } from "@mui/joy";
import { HelmetProvider, Helmet } from "react-helmet-async";

export default function About() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>About - ReactCart</title>
      </Helmet>
      <Box sx={{ maxWidth: 1000, margin: "auto", p: 2 }}>
        <Typography level="h1" sx={{ mt: 2, mb: 2 }}>
          About
        </Typography>
        <Typography level="body-md">
          ReactCart is a modern, lightweight e-commerce solution built with
          React. We're passionate about creating seamless shopping experiences
          for both customers and businesses.
        </Typography>
        <Typography level="h2" sx={{ mt: 2, mb: 2 }}>
          Our Mission
        </Typography>
        <Typography level="body-md">
          To provide a fast, intuitive, and customizable shopping cart system
          that empowers businesses of all sizes to thrive in the digital
          marketplace.
        </Typography>
        <Typography level="h2" sx={{ mt: 2, mb: 2 }}>
          Key Features
        </Typography>
        <List>
          <ListItem>
            <ListItemContent>
              <span style={{ fontWeight: "bold" }}>React-Powered: </span>
              Leveraging the latest React technologies for optimal
            </ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>
              <span style={{ fontWeight: "bold" }}>Customizable: </span>Easily
              adapt to your brand and specific needs
            </ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>
              <span style={{ fontWeight: "bold" }}>User-Friendly: </span>
              Intuitive interface for both shoppers and administrators
            </ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>
              <span style={{ fontWeight: "bold" }}>Scalable: </span>Designed to
              grow with your business
            </ListItemContent>
          </ListItem>
        </List>
        <Typography level="h2" sx={{ mt: 2, mb: 2 }}>
          Why Choose ReactCart?{" "}
        </Typography>
        <List>
          <ListItem>
            <ListItemContent>
              <span style={{ fontWeight: "bold" }}>Speed: </span>Lightning-fast
              load times and smooth interactions
            </ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>
              <span style={{ fontWeight: "bold" }}>Flexibility: </span>Integrate
              with various payment gateways and shipping providers
            </ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>
              <span style={{ fontWeight: "bold" }}>Support: </span>Dedicated
              team committed to your success
            </ListItemContent>
          </ListItem>
        </List>
        <Typography level="h2" sx={{ mt: 2, mb: 2 }}>
          Interested in boosting your online sales?
        </Typography>
        <Typography level="body-md">
          Get started with ReactCart today!
        </Typography>
      </Box>
    </HelmetProvider>
  );
}
