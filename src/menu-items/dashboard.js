/* eslint-disable */
// assets
import { 
  IconChartBar,
  IconBuildingStore,
  IconFileAnalytics,
  IconCreditCard,
  IconUserCheck
} from "@tabler/icons-react";

// constant
const icons = { 
  IconChartBar,
  IconBuildingStore,
  IconFileAnalytics,
  IconCreditCard,
  IconUserCheck
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Management",
  type: "group",
  children: [
    {
      id: "analytics-management",
      title: "Analytic",
      type: "item",
      url: "/admin/analytics",
      icon: icons.IconChartBar,
      breadcrumbs: false,
      description: "Smart parking analytics & occupancy"
    },
    {
      id: "client-management",
      title: "Client",
      type: "item",
      url: "/admin/clients",
      icon: icons.IconBuildingStore,
      breadcrumbs: false,
      description: "Manage commercial clients & accounts"
    },
    {
      id: "report-management",
      title: "Report",
      type: "item",
      url: "/admin/reports",
      icon: icons.IconFileAnalytics,
      breadcrumbs: false,
      description: "Generate and export reports"
    },
    {
      id: "subscription-management",
      title: "Subscription",
      type: "item",
      url: "/admin/subscriptions",
      icon: icons.IconCreditCard,
      breadcrumbs: false,
      description: "Subscription tiers and billing"
    },
    {
      id: "user-management",
      title: "User",
      type: "item",
      url: "/admin/users",
      icon: icons.IconUserCheck,
      breadcrumbs: false,
      description: "Manage users and permissions"
    }
  ],
};

export default dashboard;
