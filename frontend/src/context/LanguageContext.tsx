/* eslint-disable react-hooks/set-state-in-effect */
"use client";
//TODO решить вопрос с гидрацией и каскаднім рендером
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, LocaleType } from "../locales/translations";

type LanguageContextType = {
  locale: LocaleType;
  t: (typeof translations)["uk"];
  changeLanguage: (lang: LocaleType) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState<LocaleType>("uk");

  const changeLanguage = (lang: LocaleType) => {
    setLocale(lang);
    localStorage.setItem("app_locale", lang);
  };

  useEffect(() => {
    const saved = localStorage.getItem("app_locale") as LocaleType;
    if (saved && (saved === "uk" || saved === "en" || saved === "ru")) {
      setLocale(saved);
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, t: translations[locale], changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};
