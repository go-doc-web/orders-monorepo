"use client";

import { Button, Container, Alert, ButtonGroup } from "react-bootstrap";
import { useTranslation } from "../context/LanguageContext";

export default function Home() {
  const { locale, t, changeLanguage } = useTranslation();

  return (
    <Container className="mt-5 text-center">
      <Alert variant="info">
        🌐 Текущий язык / Current language:{" "}
        <strong>{locale.toUpperCase()}</strong>
      </Alert>

      <h1 className="mb-4">{t.title}</h1>

      <ButtonGroup className="mb-4">
        <Button
          variant={locale === "uk" ? "primary" : "outline-primary"}
          onClick={() => changeLanguage("uk")}
        >
          UA
        </Button>
        <Button
          variant={locale === "en" ? "primary" : "outline-primary"}
          onClick={() => changeLanguage("en")}
        >
          EN
        </Button>
        <Button
          variant={locale === "ru" ? "primary" : "outline-primary"}
          onClick={() => changeLanguage("ru")}
        >
          RU
        </Button>
      </ButtonGroup>

      <div className="mt-3 p-3 border rounded bg-light">
        <h5>Проверка меню из словаря:</h5>
        <p>
          {t.menu.orders} • {t.menu.groups} • {t.menu.products}
        </p>
      </div>
    </Container>
  );
}
