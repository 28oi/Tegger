import { useForm } from "react-hook-form";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import "../pages/Reg.css";

interface FormData {
  password: string; // Оставляем только поле для пароля
}

const RegistrationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [submittedTag, setSubmittedTag] = useState<string | null>(null);

  const onsubmit = (data: FormData) => {
    // Пример обработки данных
    setSubmittedTag(data.password);

    // Перенаправляем пользователя на другую страницу на том же домене
    window.open(window.location.origin + "/home", "_blank"); // Открываем /home на том же домене в новой вкладке
  };

  return (
    <div className="registration-container">
      <Card className="registration-card">
        <CardContent>
          <h2 className="registration-title">Регистрация</h2>
          {submittedTag ? (
            <p className="registration-success">Пароль: {submittedTag}</p>
          ) : (
            <form onSubmit={handleSubmit(onsubmit)} className="registration-form">
              {/* Поле для пароля */}
              <div>
                <label className="registration-label">Пароль</label>
                <Input
                  type="password" // Тип поля "password"
                  {...register("password", {
                    required: "Введите ваш пароль",
                    minLength: {
                      value: 6,
                      message: "Пароль должен быть минимум 6 символов",
                    },
                  })}
                  placeholder="Введите пароль"
                  className="registration-input"
                />
                {errors.password && (
                  <p className="registration-error">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="registration-button">
                Зарегистрироваться
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationPage;
