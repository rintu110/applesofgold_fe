import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Logo from "../../../images/AppBar/logo.png";
import retail from "../../../images/AppBar/retail.gif";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import TextField from "../TextField";
import Button from "../Button";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import NationFlag from "../../../images/AppBar/Made-in-the-USA.gif";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";

const AppList = styled(List)(({ theme }) => ({
  display: "block",
  width: "90%",
  [theme.breakpoints.up("sm")]: {
    width: "95%",
  },
  paddingRight: 15,
  paddingLeft: 15,
  paddingBottom: 0,
  "& .MuiListItem-root": {
    width: "100%",
    "&:hover": {
      backgroundColor: "#758b38",
      cursor: "pointer",
      "& .MuiListItemText-primary": {
        color: "#fff",
      },
    },
  },
  "& .Mui-selected": {
    backgroundColor: "#758b38",
    "& .MuiListItemText-primary": {
      color: "#FFFFFF",
    },
  },
  "& .MuiListItemText-primary": {
    color: "#46505A",
    fontSize: 14,
  },
  "& .MuiListItem-gutters": {
    padding: 0,
    paddingLeft: 10,
    marginTop: 0,
    borderRadius: 6,
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
      style={{ display: trigger ? "none" : "block" }}
    >
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Image = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "auto",
  color: "#4b7afd",
  fontSize: "18px",
  [theme.breakpoints.down("md")]: {
    width: 200,
  },
  [theme.breakpoints.down("sm")]: {
    width: 100,
  },
}));

const AppLink = styled("p")(({ theme }) => ({
  color: "#111111",
  display: "inline-block",
  fontSize: "15px",
  width: "fit-content",
  fontWeight: 400,
}));

const ItemLink = styled("p")(({ theme }) => ({
  color: "#758b38",
  fontSize: "11px",
  fontWeight: 700,
  display: "block",
  textAlign: "end",
}));

function Appbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [menuOpen, setMenuOpen] = React.useState(false);

  /**mega dropdown */
  const handleMenu = (event) => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const Items = [
    {
      name: "BRACELETS",
      link: "#",
    },
    {
      name: "CHAINS",
      link: "#",
    },
    {
      name: "CROSSES",
      link: "#",
    },
    {
      name: "RINGS",
      link: "#",
    },
    {
      name: "GEMSTONE RINGS",
      link: "#",
    },
    {
      name: "DIAMOND RINGS",
      link: "#",
    },
    {
      name: "WEDDING BANDS",
      link: "#",
    },
    {
      name: "EARRINGS",
      link: "#",
    },
    {
      name: "PENDANTS",
      link: "#",
    },
    {
      name: "SILVER",
      link: "#",
    },
    {
      name: "PERSONALIZED",
      link: "#",
    },
  ];

  const MainLink = [
    {
      name: "About",
      link: "#",
    },
    {
      name: "Account",
      link: "#",
    },
    {
      name: "Blog",
      link: "#",
    },
    {
      name: "New",
      link: "#",
    },
    {
      name: "Contact",
      link: "#",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "#fff" }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <HideOnScroll>
            <Toolbar>
              <Grid container>
                <Grid item xs={0} md={4}>
                  <Box sx={{ my: 3, textAlign: "end" }}>
                    <Image src={retail} />
                  </Box>
                </Grid>
                <Grid item xs={0} md={4}>
                  <Box sx={{ my: 2, textAlign: "center" }}>
                    <Image src={Logo} />
                  </Box>
                </Grid>
                <Grid item xs={0} md={4}>
                  <Grid container justifyContent="flex-end" align="center">
                    {MainLink.map((item, index) => (
                      <Grid item sm={3} md={2} lg={2} key={index}>
                        <Link to={item.link}>
                          <AppLink>{item.name}</AppLink>
                        </Link>
                      </Grid>
                    ))}
                    <Grid item xs={11}>
                      <Box sx={{ my: 1 }}>
                        <TextField
                          size="small"
                          color="primary"
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <Button color="primary" variant="contained">
                                Search
                              </Button>
                            ),
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </HideOnScroll>
          <Toolbar>
            <Box sx={{ py: 5, width: "100%" }}>
              <Grid container>
                {Items.map((item, index) => (
                  <Grid item xs={0} md={2} lg={1} key={index}>
                    {item.name === "GEMSTONE RINGS" ||
                    item.name === "DIAMOND RINGS" ||
                    item.name === "WEDDING BANDS" ? (
                      <Link to={item.link} style={{ textDecoration: "none" }}>
                        <ItemLink sx={{ marginLeft: 5, marginRight: 5 }}>
                          {item.name}
                        </ItemLink>
                      </Link>
                    ) : (
                      <Link to={item.link} style={{ textDecoration: "none" }}>
                        <ItemLink>{item.name}</ItemLink>
                      </Link>
                    )}
                  </Grid>
                ))}
                <Grid item xs={0} md={2} lg={1}>
                  <Box sx={{ p: 1, textAlign: "end" }}>
                    <img src={NationFlag} width="30px" />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Toolbar>
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Toolbar>
            <Button
              color="primary"
              size="small"
              variant="contained"
              disableElevation
              sx={{ minWidth: "fit-content" }}
              onClick={drawerOpen ? handleDrawerClose : handleMenu}
            >
              {drawerOpen ? <Icon>close</Icon> : <Icon>menu</Icon>}
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ my: 2, textAlign: "center" }}>
              <Image src={Logo} />
            </Box>
          </Toolbar>
          <Toolbar>
            <Box sx={{ my: 1, width: "100%" }}>
              <TextField
                size="small"
                color="primary"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Button color="primary" variant="contained">
                      Search
                    </Button>
                  ),
                }}
              />
            </Box>
          </Toolbar>
          <Box sx={{ width: "100%" }}>
            <Collapse in={drawerOpen}>
              <Paper
                elevation={0}
                sx={{ overflowY: "scroll", height: "30vh", width: "97%" }}
              >
                <AppList>
                  {MainLink.map((item, index) => (
                    <ListItem key={index} onClick={() => handleDrawerClose()}>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}
                  <ListItem
                    onClick={() =>
                      menuOpen ? setMenuOpen(false) : setMenuOpen(true)
                    }
                  >
                    <ListItemText primary={"Jewelry Items"} />
                    {menuOpen ? (
                      <Icon>expand_less</Icon>
                    ) : (
                      <Icon>expand_more</Icon>
                    )}
                  </ListItem>
                </AppList>
                <Collapse in={menuOpen}>
                  <AppList>
                    {Items.map((item, index) => (
                      <ListItem
                        key={index}
                        onClick={() => {
                          setMenuOpen(false);
                          handleDrawerClose();
                        }}
                      >
                        <ListItemText primary={item.name} />
                      </ListItem>
                    ))}
                  </AppList>
                </Collapse>
              </Paper>
            </Collapse>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}

export default Appbar;
