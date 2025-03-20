import React, { useState } from "react";
import { Participant, Song, Schedule } from "../types";

const AdminPanel: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const [newParticipant, setNewParticipant] = useState<string>("");
  const [newSong, setNewSong] = useState<string>("");
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    date: "",
    time: "",
    location: "",
  });

  const handleAddParticipant = () => {
    if (newParticipant) {
      setParticipants([...participants, { name: newParticipant }]);
      setNewParticipant("");
    }
  };

  const handleAddSong = () => {
    if (newSong) {
      setSongs([...songs, { title: newSong }]);
      setNewSong("");
    }
  };

  const handleAddSchedule = () => {
    if (newSchedule.date && newSchedule.time && newSchedule.location) {
      setSchedule([...schedule, newSchedule]);
      setNewSchedule({ date: "", time: "", location: "" });
    }
  };

  return (
    <div className="admin-panel">
      <h1>Админ Панель</h1>

      <section>
        <h2>Управление участниками</h2>
        <input
          type="text"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          placeholder="Имя участника"
        />
        <button onClick={handleAddParticipant}>Добавить участника</button>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Управление песнями</h2>
        <input
          type="text"
          value={newSong}
          onChange={(e) => setNewSong(e.target.value)}
          placeholder="Название песни"
        />
        <button onClick={handleAddSong}>Добавить песню</button>
        <ul>
          {songs.map((song, index) => (
            <li key={index}>{song.title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Управление расписанием</h2>
        <input
          type="text"
          value={newSchedule.date}
          onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
          placeholder="Дата"
        />
        <input
          type="text"
          value={newSchedule.time}
          onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
          placeholder="Время"
        />
        <input
          type="text"
          value={newSchedule.location}
          onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
          placeholder="Место"
        />
        <button onClick={handleAddSchedule}>Добавить репетицию</button>
        <ul>
          {schedule.map((item, index) => (
            <li key={index}>
              {item.date} {item.time} - {item.location}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;