// AgendaPage.js
import React, { useState } from 'react';
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

import { Bell, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const photographers  = [
  { id: 1, name: 'João', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Maria', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Tiago Melo', avatar: 'https://i.pravatar.cc/150?img=3' }
];

const times = Array.from({ length: 21 }, (_, i) => {
  const hours = Math.floor((480 + i * 30) / 60);
  const minutes = (480 + i * 30) % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
});

const events = [
  { id: 1, photographerId: 1, time: '08:00', timeEnd: '09:00', title: 'Ensaio na Av. Paulista', icon: '📷'},
  { id: 1, photographerId: 1, time: '09:00', timeEnd: '12:00', title: 'Ensaio na Av. Paulista', icon: '📷'},
  { id: 2, photographerId: 2, time: '10:30', timeEnd: '14:00', title: 'Vídeo - Ap B', color: '#36A2EB' },
  { id: 3, photographerId: 3, time: '10:00', timeEnd: '14:00', title: 'Drone - Sítio X', color: '#FFCE56' },
];

export default function AgendaPage() {  
  const [showSettings, setShowSettings] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-05-02');

  const toggleSettings = () => setShowSettings(!showSettings);
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  return (
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
          <IconButton onClick={toggleSettings}><Bell /></IconButton>
          <IconButton><ChevronLeft /></IconButton>
          <IconButton><ChevronRight /></IconButton>
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
                <AvatarImage src={p.avatar} />
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
                        <EventBlock color={event.color}>{event.title}</EventBlock>
                      </EventCell>
                    );
                  }

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
  );
}
