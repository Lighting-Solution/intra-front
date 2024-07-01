import { useState } from "react";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Alert",
    href: "/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Badges",
    href: "/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Buttons",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Cards",
    href: "/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Grid",
    href: "/grid",
    icon: "bi bi-columns",
  },
  {
    title: "Table",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "Forms",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Breadcrumbs",
    href: "/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: "bi bi-calendar",
  },
  {
    title: "전자 결재 ",
    href: "/digitalapproval",
    icon: "bi bi-file-earmark-check",
    subNav: [
      {
        title: "Pending Documents",
        href: "/digitalapproval/pending",
        icon: "bi bi-clock",
      },
      {
        title: "Rejected Documents",
        href: "/digitalapproval/rejected",
        icon: "bi bi-x-circle",
      },
    ],
  },
];

const Sidebar = () => {
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (href, index) => {
    if (collapsedIndex === index) {
      setCollapsedIndex(null);
    } else {
      setCollapsedIndex(index);
    }
    navigate(href);
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              {navi.subNav ? (
                <>
                  <NavLink
                    className="nav-link text-secondary py-3"
                    onClick={() => handleNavClick(navi.href, index)}
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                    <i
                      className={`bi ${
                        collapsedIndex === index
                          ? "bi-chevron-up"
                          : "bi-chevron-down"
                      } ms-auto`}
                    ></i>
                  </NavLink>
                  <div
                    className={`collapse ${
                      collapsedIndex === index ? "show" : ""
                    }`}
                    id={`subNav${index}`}
                  >
                    
                    <Nav vertical>
                      {navi.subNav.map((subItem, subIndex) => (
                        <NavItem key={subIndex} className="sidenav-bg">
                          <Link
                            to={subItem.href}
                            className={
                              location.pathname === subItem.href
                                ? "text-primary nav-link py-2"
                                : "nav-link text-secondary py-2"
                            }
                          >
                            <i className={subItem.icon}></i>
                            <span className="ms-3 d-inline-block">
                              {subItem.title}
                            </span>
                            

                          </Link>
                        </NavItem>
                      ))}
                    </Nav>
                  </div>
                </>
              ) : (
                <Link
                  to={navi.href}
                  className={
                    location.pathname === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              )}
            </NavItem>
          ))}
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.wrappixel.com/templates/xtreme-react-redux-admin/?ref=33"
          >
            Upgrade To Pro
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;