import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "Common/withRouter";
import { Collapse } from "react-bootstrap";
import { withTranslation } from "react-i18next";

// Import Data
import navdata from "../LayoutMenuData";
import { Link } from "react-router-dom";

const VerticalLayout = (props: any) => {
  const path = props.router.location.pathname;
  const navData = navdata().props.children;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + path;
      const ul: any = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => x.pathname === pathName);
      if (matchingMenuItem) activateParentDropdown(matchingMenuItem);
    };
    if (props.layoutType === "vertical") initMenu();
  }, [path, props.layoutType]);

  function activateParentDropdown(item: any) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
      const higherCollapse = parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown");
      if (higherCollapse) {
        higherCollapse.classList.add("show");
        const prev = higherCollapse.previousElementSibling;
        if (prev) prev.classList.add("active");
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items: any) => {
    const actiItems = items.filter((x: any) => x.classList.contains("active"));
    actiItems.forEach((item: any) => {
      if (item.classList.contains("menu-link")) {
        item.nextElementSibling?.classList.remove("show");
        if (!item.classList.contains("active")) item.setAttribute("aria-expanded", "false");
      }
      if (item.classList.contains("nav-link")) {
        item.nextElementSibling?.classList.remove("show");
        item.setAttribute("aria-expanded", "false");
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>


      {/* menu Items from navdata */}
      {(navData || []).map((item: any, key: number) => (
        <React.Fragment key={key}>
          {item.isHeader ? (
            <li className="menu-title">
              <span data-key="t-menu">{props.t(item.label)}</span>
            </li>
          ) : item.subItems ? (
            <li className="nav-item">
              <Link
                to={item.link || "/"}
                onClick={item.click}
                className="nav-link menu-link"
                data-bs-toggle="collapse"
              >
                <i className={item.icon}></i>
                <span data-key="t-apps">{props.t(item.label)}</span>
                {item.badgeName && (
                  <span
                    className={`badge badge-pill bg-soft-${item.badgeColor}`}
                    data-key="t-new"
                  >
                    {item.badgeName}
                  </span>
                )}
              </Link>
              <Collapse className="menu-dropdown" in={item.stateVariables}>
                <div id="example-collapse-text">
                  <ul className="nav nav-sm flex-column">
                    {item.subItems.map((subItem: any, idx: number) => (
                      <React.Fragment key={idx}>
                        {!subItem.isChildItem ? (
                          <li className="nav-item">
                            <Link to={subItem.link || "/"} className="nav-link">
                              {props.t(subItem.label)}
                              {subItem.badgeName && (
                                <span
                                  className={`badge badge-pill bg-soft-${subItem.badgeColor}`}
                                  data-key="t-new"
                                >
                                  {subItem.badgeName}
                                </span>
                              )}
                            </Link>
                          </li>
                        ) : (
                          <li className="nav-item">
                            <Link
                              to="#"
                              onClick={subItem.click}
                              className="nav-link"
                              data-bs-toggle="collapse"
                            >
                              {props.t(subItem.label)}
                            </Link>
                            <Collapse className="menu-dropdown" in={subItem.stateVariables}>
                              <div>
                                <ul className="nav nav-sm flex-column">
                                  {subItem.subItems.map((child: any, cIdx: number) => (
                                    <li className="nav-item" key={cIdx}>
                                      <Link to={child.link} className="nav-link">
                                        {props.t(child.label)}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </Collapse>
                          </li>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </Collapse>
            </li>
          ) : (
            <li className="nav-item">
              <Link to={item.link || "/"} className="nav-link menu-link">
                <i className={item.icon}></i>{" "}
                <span>{props.t(item.label)}</span>
                {item.badgeName && (
                  <span
                    className={`badge badge-pill badge-soft-${item.badgeColor}`}
                    data-key="t-new"
                  >
                    {item.badgeName}
                  </span>
                )}
              </Link>
            </li>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));
