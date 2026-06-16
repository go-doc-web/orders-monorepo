"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/context/LanguageContext";
import { LocaleType } from "@/locales/translations.js";
import { SidebarMenuItem } from "@/types/index";
import { Nav, Button, ButtonGroup } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { SIDEBAR_MENU_ITEMS, AVAILABLE_LANGUAGES } from "./sidebar.config";

export default function Sidebar(): React.JSX.Element {
  const pathname: string = usePathname();
  const { locale, t, changeLanguage } = useTranslation();

  return (
    <div
      className="d-none d-md-flex flex-column vh-100 p-3 bg-white border-end"
      style={{
        width: "260px",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Блок Профиля (Православный мужской аватар) */}
      <div className="text-center my-4">
        <div className="position-relative d-inline-block">
          <Image
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=faces"
            alt="User Avatar"
            width={90}
            height={90}
            unoptimized
            className="rounded-circle border"
            style={{ objectFit: "cover" }}
          />

          <Link
            href="/settings"
            className="position-absolute bottom-0 end-0 bg-white p-1 rounded-circle shadow-sm border text-secondary d-flex align-items-center justify-content-center"
            style={{ width: "28px", height: "28px" }}
          >
            <Gear size={14} />
          </Link>
        </div>
        <h6 className="mt-3 mb-0 fw-bold text-secondary">Oleh Hubskiy</h6>
      </div>

      <hr className="text-muted my-2" />

      {/* Навигационное меню через компоненты React-Bootstrap */}
      <Nav className="flex-column flex-grow-1 mt-3">
        {SIDEBAR_MENU_ITEMS.map((item: SidebarMenuItem) => {
          const isActive: boolean = pathname === item.pathname;

          return (
            <Nav.Link
              key={item.pathname}
              as={Link}
              href={item.pathname}
              className={`d-flex align-items-center py-2 px-3 my-1 rounded fw-bold transition-all ${
                isActive
                  ? "bg-dark text-white shadow-sm"
                  : "text-dark bg-transparent"
              }`}
              style={{ transition: "0.2s" }}
            >
              {item.icon}
              <span className="small text-uppercase tracking-wider">
                {t.menu[item.translationKey]}
              </span>
            </Nav.Link>
          );
        })}
      </Nav>

      {/* Переключатель языков  */}
      <div className="mt-auto pt-3 border-top text-center">
        <ButtonGroup
          size="sm"
          className="w-100 shadow-sm border rounded bg-light p-1"
        >
          {AVAILABLE_LANGUAGES.map((lang: LocaleType) => (
            <Button
              key={lang}
              variant={locale === lang ? "dark" : "link"}
              className={`py-1 fw-bold text-uppercase border-0 rounded ${
                locale === lang ? "text-white" : "text-muted"
              }`}
              style={{ fontSize: "11px", textDecoration: "none" }}
              onClick={() => changeLanguage(lang)}
            >
              {lang === "uk" ? "UA" : lang}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
