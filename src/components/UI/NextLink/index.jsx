import * as React from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";

const HyperLink = styled("a")(() => ({
  textDecoration: "none",
  textAlign: "unset",
  margin: 0,
  padding: 0,
  width: "100%",
  color: "unset",
  "&:hover": {
    textDecoration: "none",
    textAlign: "unset",
  },
}));

const Links = styled(Link)(() => ({
  textDecoration: "none",
  margin: 0,
  padding: 0,
  width: "100%",
}));

function NextLink({ href, children }) {
  return (
    <Links href={href} passHref replace>
      <HyperLink>{children}</HyperLink>
    </Links>
  );
}

export default NextLink;
