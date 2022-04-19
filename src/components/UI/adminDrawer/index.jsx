import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { resetEverythingUniveral } from "actions/universal";

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
    {
      icon: "format_list_bulleted",
      name: "Category Types",
      link: "#",
      color: "#f3a4b5",
      expand: [
        {
          icon: "category",
          name: "Category",
          link: "/admin/category",
          color: "#c40808",
        },
        {
          icon: "view_agenda",
          name: "Category meta",
          link: "/admin/category-meta",
          color: "#1292ff",
        },
      ],
    },
    {
      icon: "shopping_bag",
      name: "Product Types",
      link: "#",
      color: "#0c34ab",
      expand: [
        {
          icon: "local_mall",
          name: "Product",
          link: "/admin/product",
          color: "#a0d411",
        },
        {
          icon: "view_agenda",
          name: "Product meta",
          link: "/admin/product-meta",
          color: "#ff1100",
        },
      ],
    },
    {
      icon: "assignment",
      name: "Assign Category & Product",
      link: "/admin/assign-category&product",
      color: "#f5ad05",
    },
    {
      icon: "attribution",
      name: "Attribute Type",
      link: "/admin/attributes",
      color: "#eb4034",
      expand: [
        {
          icon: "assignment_turned_in",
          name: "Attributes",
          link: "/admin/attributes",
          color: "#34eb3a",
        },
        // {
        //   icon: "view_agenda",
        //   name: "Product meta",
        //   link: "/admin/product-meta",
        //   color: "#ff1100",
        // },
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
                width={300}
                height={80}
              />
            </Box>
            <DrawerList>
              {router.map((item, index) =>
                item.expand ? (
                  <DrawerList key={index}>
                    <ListItem>
                      <ListItemButton onClick={() => handleClick(index)}>
                        <ListItemIcon>
                          <Icon sx={{ color: item.color }}>{item.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                        {open === index ? (
                          <Icon>expand_less</Icon>
                        ) : (
                          <Icon>expand_more</Icon>
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
                                <ListItemIcon>
                                  <Icon sx={{ color: exp.color }}>
                                    {exp.icon}
                                  </Icon>
                                </ListItemIcon>
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
                        <ListItemIcon>
                          <Icon sx={{ color: item.color }}>{item.icon}</Icon>
                        </ListItemIcon>
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
