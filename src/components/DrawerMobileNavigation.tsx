import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import ModeToggle from "./ModeToggle";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function DrawerMobileNavigation() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  return (
    <React.Fragment>
      <IconButton
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
          }}
        >
          <Typography
            component="label"
            htmlFor="close-icon"
            sx={{ fontSize: "sm", fontWeight: "lg", cursor: "pointer" }}
          >
            Close
          </Typography>
          <ModalClose id="close-icon" sx={{ position: "initial" }} />
        </Box>
        <Input
          size="sm"
          placeholder="Search"
          variant="plain"
          endDecorator={<Search />}
          slotProps={{
            input: {
              "aria-label": "Search anything",
            },
          }}
          sx={{
            m: 3,
            borderRadius: 0,
            borderBottom: "2px solid",
            borderColor: "neutral.outlinedBorder",
            "&:hover": {
              borderColor: "neutral.outlinedHoverBorder",
            },
            "&::before": {
              border: "1px solid var(--Input-focusedHighlight)",
              transform: "scaleX(0)",
              left: 0,
              right: 0,
              bottom: "-2px",
              top: "unset",
              transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
              borderRadius: 0,
            },
            "&:focus-within::before": {
              transform: "scaleX(1)",
            },
          }}
        />
        <List
          size="lg"
          component="nav"
          sx={{
            flex: "none",
            fontSize: "xl",
            "& > div": { justifyContent: "center" },
          }}
        >
          <ListItemButton
            component={RouterLink}
            to="/"
            onClick={() => setOpen(false)}
            sx={{
              justifyContent: "center",
              fontWeight: location.pathname === "/" ? "bold" : "normal",
              color: location.pathname === "/" ? "primary.500" : "text.primary",
            }}
          >
            Home
          </ListItemButton>
          <ListItemButton
            component={RouterLink}
            to="/contact"
            onClick={() => setOpen(false)}
            sx={{
              justifyContent: "center",
              fontWeight: location.pathname === "/contact" ? "lg" : "normal",
              color:
                location.pathname === "/contact"
                  ? "primary.500"
                  : "text.primary",
            }}
          >
            Contact
          </ListItemButton>
        </List>
        <hr></hr>
        <div className="mode-toggle-container">
          Choose color mode:
          <ModeToggle />
        </div>
      </Drawer>
    </React.Fragment>
  );
}
