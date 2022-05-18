import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#02402E",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const Footer = () => {
 
  return (
    <AppBar
      position="fixed"
      theme={theme}
      sx={{
        top: "auto",
        bottom: 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <div>
              &copy; {new Date().getFullYear()} Copyright{" "}
              <p> Powered by OpenAI and designed by Mario Rojas</p>
            </div>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div>
              &copy; {new Date().getFullYear()} Copyright{" "}
              <p> Powered by OpenAI and designed by Mario Rojas</p>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
