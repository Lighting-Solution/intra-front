import React, { useState } from "react";
import { Button, Nav, NavItem, NavLink, Collapse } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigation = [
  {
    title: "대시보드",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },

  {
    title: "주소록", // 추가된 Contact 링크
    href: "/contact",
    icon: "bi bi-journal",
  },
  {
    title: "메신저", // 추가된 Chat 링크
    href: "/chat",
    icon: "bi bi-chat",
  },
  {
    title: "문서함",
    href: "/document",
    icon: "bi bi-card-text",
  },
  {
    title: "전자 결재",
    href: "/digitalapproval",
    icon: "bi bi-file-earmark-check",
    subNav: [
      {
        title: "결재 대기 문서",
        href: "/digitalapproval/pending",
        icon: "bi bi-clock",
      },
      {
        title: "결재 반려 문서",
        href: "/digitalapproval/rejected",
        icon: "bi bi-x-circle",
      },
    ],
  },
  {
    title: "캘린더",
    href: "/calendar",
    icon: "bi bi-calendar",
  },
];

const boardNavigation = [
  {
    title: "사내 공지",
    href: "/notice",
    icon: "bi bi-megaphone",
  },
  {
    title: "자유 게시판",
    href: "/freeboard",
    icon: "bi bi-chat-dots",
  },
];

const Sidebar = () => {
  const [collapsedIndex, setCollapsedIndex] = useState(null);
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const navigate = useNavigate();

  const toggleBoardMenu = () => {
    setIsBoardOpen(!isBoardOpen);
  };

  const handleNavClick = (href, index) => {
    if (collapsedIndex === index) {
      setCollapsedIndex(null);
    } else {
      setCollapsedIndex(index);
    }
    navigate(href);
  };

  const handleBoardNavClick = (href) => {
    if (href === "/notice") {
      if (localStorage.getItem("empAdmin") == "true") {
        console.log("관리자");
        navigate("/notice");
      } else {
        console.log("사용자");
        navigate("/notice/user");
      }
    } else {
      navigate(href);
    }
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
                    className="nav-link text-secondary py-3 d-flex justify-content-between align-items-center"
                    onClick={() => handleNavClick(navi.href, index)}
                  >
                    <span>
                      <i className={navi.icon}></i>
                      <span className="ms-3 d-inline-block">{navi.title}</span>
                    </span>
                    <i
                      className={`bi ${
                        collapsedIndex === index
                          ? "bi-chevron-up"
                          : "bi-chevron-down"
                      }`}
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
                      ? "text-primary nav-link py-3 d-flex justify-content-between align-items-center"
                      : "nav-link text-secondary py-3 d-flex justify-content-between align-items-center"
                  }
                >
                  <span>
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </span>
                </Link>
              )}
            </NavItem>
          ))}
          <NavItem className="sidenav-bg" onClick={toggleBoardMenu}>
            <div
              className={
                isBoardOpen
                  ? "nav-link py-3 text-primary"
                  : "nav-link py-3 text-secondary"
              }
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-layout-text-window-reverse"></i>
              <span className="ms-3 d-inline-block">게시판</span>
              <i
                className={`bi ms-auto ${
                  isBoardOpen ? "bi-chevron-up" : "bi-chevron-down"
                }`}
                style={{ float: "right" }}
              ></i>
            </div>
          </NavItem>
          <Collapse isOpen={isBoardOpen}>
            {boardNavigation.map((navi, index) => (
              <NavItem key={index} className="sidenav-bg">
                <div
                  className={
                    location.pathname === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                  onClick={() => handleBoardNavClick(navi.href)}
                  style={{ cursor: "pointer" }}
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </div>
              </NavItem>
            ))}
          </Collapse>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
