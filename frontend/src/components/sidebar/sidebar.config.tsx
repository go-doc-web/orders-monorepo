import {
  FileEarmarkPlus,
  BoxSeam,
  Gear,
  People,
  Grid,
} from "react-bootstrap-icons";
import { LocaleType } from "@/locales/translations.js";
import { SidebarMenuItem } from "@/types/index";

// Config Items of Menu Sidebar
export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    pathname: "/orders",
    translationKey: "orders",
    icon: <FileEarmarkPlus className="me-3" size={20} />,
    inDevelopment: false,
  },
  {
    pathname: "/groups",
    translationKey: "groups",
    icon: <Grid className="me-3" size={20} />,
    inDevelopment: true,
  },
  {
    pathname: "/products",
    translationKey: "products",
    icon: <BoxSeam className="me-3" size={20} />,
    inDevelopment: false,
  },
  {
    pathname: "/users",
    translationKey: "users",
    icon: <People className="me-3" size={20} />,
    inDevelopment: true,
  },
  {
    pathname: "/settings",
    translationKey: "settings",
    icon: <Gear className="me-3" size={20} />,
    inDevelopment: true,
  },
];

// Config Lang Locales
export const AVAILABLE_LANGUAGES: LocaleType[] = ["uk", "en", "ru"];
