import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { resetEverythingUniveral } from "actions/universal";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CategoryIcon from "@mui/icons-material/Category";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LooksIcon from "@mui/icons-material/Looks";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttributionIcon from "@mui/icons-material/Attribution";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    borderRadius: 0,
    padding: 1,
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  "& .MuiListItemIcon-root": {
    minWidth: "fit-content",
    paddingRight: 20,
  },
  "& .MuiListItemText-primary": {
    color: "#525f7f",
    fontSize: 16,
  },
  "& .MuiListItemText-secondary": {
    color: "#525f7f",
    fontSize: 16,
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

const drawerWidth = 340;

function AdminDrawer({ Components }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetEverythingUniveral());
  }, []);

  const [open, setOpen] = React.useState(-1);

  const handleClick = (event) => {
    if (event === open) {
      setOpen(-1);
    } else {
      setOpen(event);
    }
  };

  const router = [
    {
      icon: <EmojiFlagsIcon sx={{ color: "#eaf536" }} />,
      name: "Country",
      link: "/admin/country",
    },
    {
      icon: <DomainAddIcon sx={{ color: "#36f5bf" }} />,
      name: "State",
      link: "/admin/state",
    },
    {
      icon: <FormatListBulletedIcon sx={{ color: "#f3a4b5" }} />,
      name: "Category",
      link: "/admin/category",
    },
    {
      icon: <LooksIcon sx={{ color: "#172b4d" }} />,
      name: "Product",
      link: "/admin/product",
    },
    {
      icon: <AssignmentIcon sx={{ color: "#5e72e4" }} />,
      name: "Assign",
      link: "#",
      expand: [
        {
          icon: <CategoryIcon sx={{ color: "#11cdef" }} />,
          name: "Category & Product",
          link: "/admin/assign-category&product",
        },
      ],
    },
    {
      icon: <SettingsApplicationsIcon sx={{ color: "#ffd600" }} />,
      name: "Attribute",
      link: "/admin/attributes",
      expand: [
        {
          icon: <AssignmentTurnedInIcon sx={{ color: "#34eb3a" }} />,
          name: "Attributes",
          link: "/admin/attributes",
        },
        {
          icon: <FormatListNumberedIcon sx={{ color: "#4287f5" }} />,
          name: "Attributes Options",
          link: "/admin/attributes-options",
        },
      ],
    },
    {
      icon: <ViewAgendaIcon sx={{ color: "#ff1100" }} />,
      name: "Meta",
      link: "#",
      expand: [
        {
          icon: <ViewAgendaIcon sx={{ color: "#1292ff" }} />,
          name: "Category meta",
          link: "/admin/category-meta",
        },
        {
          icon: <ViewAgendaIcon sx={{ color: "#172b4d" }} />,
          name: "Product meta",
          link: "/admin/product-meta",
        },
      ],
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
            <Box sx={{ m: "10px" }}>
              <Image
                src={"/images/adminDrawer/apples-of-gold-jewelry.png"}
                width={220}
                height={60}
                alt="logo"
              />
            </Box>
            <DrawerList>
              {router.map((item, index) =>
                item.expand ? (
                  <DrawerList key={index}>
                    <ListItem>
                      <ListItemButton onClick={() => handleClick(index)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                        {open === index ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={index === open} timeout="auto" unmountOnExit>
                      {item.expand.map((exp, expindex) => (
                        <DrawerList disablePadding key={expindex}>
                          <ListItem>
                            <Link
                              href={exp.link}
                              style={{
                                textDecoration: "none",
                                margin: 0,
                                padding: 0,
                                width: "100%",
                              }}
                              passHref={true}
                            >
                              <ListItemButton>
                                <ListItemIcon>{exp.icon}</ListItemIcon>
                                <ListItemText primary={exp.name} />
                              </ListItemButton>
                            </Link>
                          </ListItem>
                        </DrawerList>
                      ))}
                    </Collapse>
                  </DrawerList>
                ) : (
                  <ListItem key={index}>
                    <Link
                      href={item.link}
                      style={{
                        textDecoration: "none",
                        margin: 0,
                        padding: 0,
                        width: "100%",
                      }}
                      passHref={true}
                    >
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                )
              )}
            </DrawerList>
          </Box>
        </CustomDrawer>
        <Box sx={{ my: 2, mr: 2, bgcolor: "#fff", width: "100%" }}>
          {Components}
        </Box>
      </FlexBox>
    </>
  );
}

export default AdminDrawer;
