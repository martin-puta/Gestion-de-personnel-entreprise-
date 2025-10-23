import React, { useState } from 'react'
import { FaCommentAlt, FaRegChartBar, FaShoppingBag, FaTh, FaThList, FaBars, FaUserAlt } from "react-icons/fa";

import { FcComments } from "react-icons/fc";
import { FcOrganization } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { NavLink } from 'react-router-dom';
import { FcList, FcBusiness, FcBarChart } from "react-icons/fc";
export const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FcOrganization />
    },
    {
      path: "/about",
      name: "About",
      icon: <FcPortraitMode />
    },
    {
      path: "/analatics",
      name: "Analatics",
      icon: <FcBarChart />
    },
    {
      path: "/comment",
      name: "Comment",
      icon: <FcComments />
    },
    {
      path: "/product",
      name: "Product",
      icon: <FaShoppingBag />
    },
    {
      path: "/productList",
      name: "ProductList",
      icon: <FcList />
    }
  ]
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />

          </div>
        </div>
        {
          menuItem?.map((item, index) => (
            <abbr title='Click Me'>
            <NavLink to={item.path} key={index} className="link" activeclassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
            </NavLink></abbr>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  )
}
export default SideBar;
