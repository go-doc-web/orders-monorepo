import { useTranslation } from "@/context/LanguageContext";

export default function ErrorAlert() {
  const { t } = useTranslation();
  return (
    <div className="alert alert-danger m-3" role="alert">
      {t.error?.page ||
        "Ошибка загрузки данных. Проверьте подключение к серверу."}
    </div>
  );
}
