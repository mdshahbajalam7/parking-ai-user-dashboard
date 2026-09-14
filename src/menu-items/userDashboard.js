/* eslint-disable */
// assets
import {
  IconDashboard,
  IconPackage,
  IconCreditCard,
  IconBook2,
  IconHelp,
  IconUser,
  IconShieldCheck,
  IconLogout
} from "@tabler/icons-react";

// constant
const icons = {
  IconDashboard,
  IconPackage,
  IconCreditCard,
  IconBook2,
  IconHelp,
  IconUser,
  IconShieldCheck,
  IconLogout
};

// ==============================|| USER DASHBOARD MENU ITEMS ||============================== //

const userDashboard = {
  id: "user-portal",
  title: "Management",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/user/dashboard",
      icon: icons.IconDashboard,
      breadcrumbs: false,
      description: "Live occupancy & smart parking overview"
    },
    {
      id: "my-plans",
      title: "My plans",
      type: "item",
      url: "/user/my-plans",
      icon: icons.IconPackage,
      breadcrumbs: false,
      description: "Subscription tiers, features & quotas"
    },
    {
      id: "billing",
      title: "Billing",
      type: "item",
      url: "/user/billing",
      icon: icons.IconCreditCard,
      breadcrumbs: false,
      description: "Payment methods, invoices & history"
    },
    {
      id: "resources",
      title: "Resources",
      type: "item",
      url: "/user/resources",
      icon: icons.IconBook2,
      breadcrumbs: false,
      description: "Guides, documentation & tutorials"
    },
    {
      id: "help",
      title: "Help",
      type: "item",
      url: "/user/help",
      icon: icons.IconHelp,
      breadcrumbs: false,
      description: "Support tickets, FAQs & contacts"
    },
    {
      id: "account-info",
      title: "Account info",
      type: "item",
      url: "/user/account-info",
      icon: icons.IconUser,
      breadcrumbs: false,
      description: "Profile, credentials & preferences"
    },
    {
      id: "account-active",
      title: "Account active",
      type: "item",
      url: "/user/account-active",
      icon: icons.IconShieldCheck,
      breadcrumbs: false,
      description: "Status, verified permissions & sessions"
    },
    {
      id: "logout",
      title: "Logout",
      type: "item",
      url: "/logout",
      icon: icons.IconLogout,
      breadcrumbs: false,
      description: "Sign out of your account"
    }
  ]
};

export default userDashboard;
