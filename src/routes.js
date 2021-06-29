/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Home from "views/p2p.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/p2p",
    name: "P2P",
    rtlName: "الرموز",
    icon: "tim-icons icon-send",
    component: Home,
    layout: "/admin",
  },
  {
    path: "/swap",
    name: "Swap",
    rtlName: "خرائط",
    icon: "tim-icons icon-refresh-02",
    component: Map,
    layout: "/admin",
  },
  {
    path: "/deposit",
    name: "Deposit",
    rtlName: "إخطارات",
    icon: "tim-icons icon-cloud-upload-94",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/withdraw",
    name: "withdraw",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-cloud-download-93",
    component: UserProfile,
    layout: "/admin",
  },
];
export default routes;
