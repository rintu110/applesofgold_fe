import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../../../images/adminDrawer/apples-of-gold-jewelry.png";
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#f7f8fa",
}));

const DrawerList = styled(List)(({ theme }) => ({
  padding: 0,
  "& .MuiListItem-root": {
    width: 280,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    padding: 2,
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  // "& .Mui-selected": {
  //   "&.MuiListItem-root": {
  //     color: "#FFFFFF",
  //     backgroundColor: "#ec407ade",
  //   },
  //   "& .MuiListItemIcon-root": {
  //     color: "#FFFFFF",
  //   },
  //   "& .MuiListItemText-primary": {
  //     color: "#FFFFFF",
  //     fontSize: 18,
  //   },
  //   "&:hover": {
  //     backgroundColor: "#ec407ade",
  //   },
  // },
  "& .MuiListItemIcon-root": {
    minWidth: "fit-content",
    paddingRight: 20,
  },
  "& .MuiListItemText-primary": {
    color: "#525f7f",
    fontSize: 18,
  },
  "& .MuiListItemText-secondary": {
    color: "#525f7f",
    fontSize: 15,
  },
}));

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#f7f8fa",
    borderRight: 0,
  },
}));

const Image = styled("img")(({ theme }) => ({
  maxWidth: 250,
  maxHeight: "4rem",
  margin: "10px auto 10px auto",
}));

const drawerWidth = 340;

function AdminDrawer(props) {
  const router = [
    {
      icon: "outlined_flag",
      name: "Country",
      link: "/admin/country",
      color: "#eaf536",
    },
    {
      icon: "domain_add",
      name: "State",
      link: "/admin/state",
      color: "#36f5bf",
    },
  ];

  return (
    <>
      <FlexBox>
        <CustomDrawer variant="permanent" anchor="left">
          <Box
            sx={{
              border: "solid 1px #e2e2e2",
              m: 2,
              borderRadius: 3,
              textAlign: "center",
            }}
            className="admin-drawer"
          >
            <Image src={Logo} />
            <DrawerList>
              {router.map((item, index) => (
                <ListItem button key={index}>
                  <Link
                    to={item.link}
                    style={{
                      textDecoration: "none",
                      margin: 0,
                      padding: 0,
                      width: "100%",
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon sx={{ color: item.color }}>{item.icon}</Icon>
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </DrawerList>
          </Box>
        </CustomDrawer>
        <Box sx={{ my: 2, mr: 2, bgcolor: "#fff", width: "100%" }}>
          {props.components}
        </Box>
      </FlexBox>
    </>
  );
}

export default AdminDrawer;
