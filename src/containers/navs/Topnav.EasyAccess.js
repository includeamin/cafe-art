import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";

const TopnavEasyAccess = () => {
  return (
    <div className="position-relative d-none d-sm-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle className="header-icon" color="empty">
          <i className="simple-icon-grid" />
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3"
          right
          id="iconMenuDropdown"
        >
          <NavLink to="/app/maindashboards" className="icon-menu-item">
            <i className="iconsminds-shop-4 d-block" />{" "}
            <IntlMessages id="menu.dashboards" />
          </NavLink>

          <NavLink to="/app/dashboards" className="icon-menu-item">
            <i className="iconsminds-dice d-block" />{" "}
            <IntlMessages id="categories" />
          </NavLink>
          <NavLink to="/app/items" className="icon-menu-item">
            <i className="iconsminds-shopping-cart d-block" />{" "}
            <IntlMessages id="items" />
          </NavLink>
          <NavLink to="/app/message" className="icon-menu-item">
            <i className="iconsminds-speach-bubble d-block" />{" "}
            <IntlMessages id="Notification" />
          </NavLink>
          <NavLink to="/app/comments" className="icon-menu-item">
            <i className="iconsminds-friendster d-block" />{" "}
            <IntlMessages id="comments" />
          </NavLink>
          <NavLink to="/app/exit" className="icon-menu-item">
            <i className="simple-icon-logout d-block" />{" "}
            <IntlMessages id="exit" />
          </NavLink>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavEasyAccess;
