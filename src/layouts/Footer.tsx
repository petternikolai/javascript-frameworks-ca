import { Typography, IconButton, Box } from "@mui/joy";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <>
      <hr className="footer-divider" />
      <footer className="footer">
        <Box className="footer-content">
          <Typography
            level="body-sm"
            component="p"
            className="footer-copyright"
          >
            &copy; 2024 ReactCart. All rights reserved.
          </Typography>
          <Box className="footer-icons">
            <IconButton
              component="a"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </footer>
    </>
  );
}
