import React, { useState } from "react";
import { Link } from "react-router-dom"; // Если используете react-router для навигации\
import "../pages/HomePage.css"


const HomePage: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="home-page">
      <header>
        <div className="menu-container">
          <div className="menu-logo">
            <h1>"ЗАО"Бещеки</h1>
          </div>
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>
              Меню
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <Link to="#participants">Участники</Link>
                <Link to="#songs">Песни</Link>
                <Link to="#schedule">Расписание</Link>
                <Link to="/auth">Авторизация</Link>
                <Link to="/register">Регистрация</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        <section id="participants">
          <h2>Участники</h2>
          {/* Ваши данные */}
        </section>

        <section id="songs">
          <h2>Песни</h2>
          {/* Ваши данные */}
        </section>

        <section id="schedule">
          <h2>Расписание репетиций</h2>
          {/* Ваши данные */}
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Панк Рок Группа</p>
      </footer>
    </div>
  );
};

export default HomePage;
