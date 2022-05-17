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
import NextLink from "components/UI/NextLink";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { resetEverythingUniveral } from "actions/universal";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CategoryIcon from "@mui/icons-material/Category";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import LooksIcon from "@mui/icons-material/Looks";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#f7f8fa",
  alignItems: "center",
  width: "100%",
}));

const DrawerList = styled(List)(({ theme }) => ({
  padding: 0,
  "& .MuiListItem-root": {
    width: "95%",
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
  width: "22%",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "22%",
    boxSizing: "border-box",
    backgroundColor: "#f7f8fa",
    borderRight: 0,
  },
}));

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
      icon: <SettingsApplicationsIcon sx={{ color: "#ffd600" }} />,
      name: "Attribute",
      link: "/admin/attributes",
    },
    {
      icon: <AssignmentIcon sx={{ color: "#5e72e4" }} />,
      name: "Assign",
      expand: [
        {
          icon: <CategoryIcon sx={{ color: "#11cdef" }} />,
          name: "Category & Product",
          link: "/admin/assign-category&product",
        },
      ],
    },
    {
      icon: <LocalShippingIcon sx={{ color: "#048025" }} />,
      name: "Shipping",
      expand: [
        {
          icon: <ChatBubbleIcon sx={{ color: "#344a3a" }} />,
          name: "Shipping Message",
          link: "/admin/shipping-message",
        },
      ],
    },
    {
      icon: <ViewAgendaIcon sx={{ color: "#ff1100" }} />,
      name: "Meta",
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
                width={"350px"}
                height={"100%"}
                alt="logo"
                layout="intrinsic"
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
                            <NextLink href={exp.link}>
                              <ListItemButton>
                                <ListItemIcon>{exp.icon}</ListItemIcon>
                                <ListItemText primary={exp.name} />
                              </ListItemButton>
                            </NextLink>
                          </ListItem>
                        </DrawerList>
                      ))}
                    </Collapse>
                  </DrawerList>
                ) : (
                  <ListItem key={index}>
                    <NextLink href={item.link}>
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </NextLink>
                  </ListItem>
                )
              )}
            </DrawerList>
          </Box>
        </CustomDrawer>
        <Box sx={{ my: 2, mr: 2, bgcolor: "#fff", width: "78%" }}>
          {Components}
        </Box>
      </FlexBox>
    </>
  );
}

export default AdminDrawer;
