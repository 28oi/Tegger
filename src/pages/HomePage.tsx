import React, { useState, useEffect } from "react";
import { Participant, Song, Schedule } from "../types";


const HomePage: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [countdown, setCountdown] = useState<string>("");

  const nextRehearsal = new Date("March 20, 2025 18:00:00").getTime();

  // Таймер до репетиции
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextRehearsal - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("Репетиция началась!");
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${hours}ч ${minutes}м ${seconds}с`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <header>
        <h1>Панк Рок Группа</h1>
        <nav>
          <ul>
            <li><a href="#participants">Участники</a></li>
            <li><a href="#songs">Песни</a></li>
            <li><a href="#schedule">Расписание</a></li>
            <li><a href="/admin">Админ Панель</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="participants">
          <h2>Участники</h2>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant.name}</li>
            ))}
          </ul>
        </section>

        <section id="songs">
          <h2>Песни</h2>
          <ul>
            {songs.map((song, index) => (
              <li key={index}>{song.title}</li>
            ))}
          </ul>
        </section>

        <section id="schedule">
          <h2>Расписание репетиций</h2>
          <table>
            <tr>
              <th>Дата</th>
              <th>Время</th>
              <th>Место</th>
            </tr>
            {schedule.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </table>
        </section>

        <section id="timer">
          <h2>Таймер до следующей репетиции</h2>
          <p>{countdown}</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Панк Рок Группа</p>
      </footer>
    </div>
  );
};

export default HomePage;