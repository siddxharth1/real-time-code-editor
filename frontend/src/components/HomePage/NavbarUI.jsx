import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

const NavbarUI = () => {
  return (
    <Navbar isBordered className="bg-transparent">
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary">
            <Link to="/join">Join Room</Link>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarUI;
