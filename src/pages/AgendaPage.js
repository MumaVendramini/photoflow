// AgendaPage.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
  AgendaContainer,
  AgendaHeader,
  HeaderLeft,
  HeaderRight,
  IconButton,
  AvatarList,
  GridContainer,
  TimeColumn,
  PhotographerColumn,
  EventBlock,
  FloatingButton,
  SettingsPopup,
  CalendarPopup,
  CalendarContainer,
  CalendarHeader,
  CalendarBody,
  StyledDateInput,
  AvatarItem,
  AvatarImage,
  AvatarName,
  EventCell,
  EmptyCell,
  HourLabel
} from '../components/AgendaPage.styles';

import { Bell, ChevronLeft, ChevronRight, Plus, MenuIcon, } from 'lucide-react';

const photographers = [
  { id: 1, name: 'João', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Maria', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Tiago Melo', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Larissa Costa', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Rafael Lima', avatar: 'https://i.pravatar.cc/150?img=5' }
];

const interval = 30; // minutos
const startHour = 9;
const startMinute = 30;
const endHour = 17;

const totalSlots = ((endHour * 60) - (startHour * 60 + startMinute)) / interval + 1;

const times = Array.from({ length: totalSlots }, (_, i) => {
  const minutesFromStart = i * interval;
  const totalMinutes = startHour * 60 + startMinute + minutesFromStart;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
});

const events = [
  { id: 1, photographerId: 1, time: '15:00', timeEnd: '16:00', title: 'Ensaio na Av. Paulista', icon: '📷' },
  { id: 2, photographerId: 1, time: '09:30', timeEnd: '12:00', title: 'Editorial Lookbook', icon: '📸' },
  { id: 3, photographerId: 2, time: '10:30', timeEnd: '14:00', title: 'Vídeo - Ap B', color: '#36A2EB' },
  { id: 4, photographerId: 3, time: '10:00', timeEnd: '14:00', title: 'Drone - Sítio X', color: '#FFCE56' },
];


export default function AgendaPage({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-05-02');

  const toggleSettings = () => setShowSettings(!showSettings);
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate.toISOString().slice(0, 10));
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate.toISOString().slice(0, 10));
  };

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1100,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
        aria-label="Abrir menu"
      >
        <MenuIcon size={28} color="#333" />
      </button>

      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <AgendaContainer>    
        <AgendaHeader>
          <HeaderLeft>
            <StyledDateInput
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </HeaderLeft>
          <HeaderRight>
            <IconButton onClick={toggleSettings} aria-label="Notificações"><Bell /></IconButton>
            <IconButton onClick={goToPreviousDay} aria-label="Dia anterior"><ChevronLeft /></IconButton>
            <IconButton onClick={goToNextDay} aria-label="Próximo dia"><ChevronRight /></IconButton>
          </HeaderRight>
        </AgendaHeader>

        {showSettings && (
          <SettingsPopup>
            <p>Notificações pendentes</p>
          </SettingsPopup>
        )}

        {showCalendar && (
          <CalendarPopup>
            <p>Escolher agenda</p>
          </CalendarPopup>
        )}

        <CalendarContainer>
              <CalendarHeader>
            <HourLabel>Horários</HourLabel>
            <AvatarList>
              {photographers.map((p) => (
                <AvatarItem key={p.id}>
                  <AvatarImage src={p.avatar} alt={`Avatar de ${p.name}`} />
                  <AvatarName>{p.name}</AvatarName>
                </AvatarItem>
              ))}
            </AvatarList>
          </CalendarHeader>

          <CalendarBody>
            <GridContainer numPhotographers={photographers.length}>
              <TimeColumn>
                {times.map((time) => (
                  <div key={time}>{time}</div>
                ))}
              </TimeColumn>

              {photographers.map((photographer) => (
                <PhotographerColumn key={photographer.id}>
                  {times.map((time, index) => {
                    const event = events.find(
                      (e) => e.photographerId === photographer.id && e.time === time
                    );

                    if (event) {
                      const startIndex = index;
                      const endIndex = times.findIndex((t) => t === event.timeEnd);
                      const blockCount = endIndex > startIndex ? endIndex - startIndex : 1;
                      const blockHeight = blockCount * 25;

                      return (
                        <EventCell key={time} height={blockHeight}>
                          <EventBlock color={event.color}>
                            {event.icon && <span style={{ marginRight: 6 }}>{event.icon}</span>}
                            {event.title}
                          </EventBlock>
                        </EventCell>
                      );
                    }

                    // Verifica se esse slot já foi coberto por outro evento
                    const isCovered = events.some((e) => {
                      const start = times.findIndex((t) => t === e.time);
                      const end = times.findIndex((t) => t === e.timeEnd);
                      return (
                        e.photographerId === photographer.id &&
                        index > start &&
                        index < end
                      );
                    });

                    if (isCovered) return null;

                    return <EmptyCell key={time} />;
                  })}
                </PhotographerColumn>
))}

            </GridContainer>
          </CalendarBody>
        </CalendarContainer>

        <FloatingButton>
          <Plus />
        </FloatingButton>
      </AgendaContainer>

      <main>
        {children}
      </main>
    </>
  );
}
