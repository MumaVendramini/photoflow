import styled from 'styled-components';


export const AgendaContainer = styled.div`  
  display: flex;
  flex-direction: column;
  height: 100vh; /* Ocupa 100% da altura da tela */
  overflow: hidden;
`;

export const AgendaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 10;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;

export const HeaderLeft = styled.div``;

export const StyledDateInput = styled.input`
  background: transparent;
  font-size: 1.5rem;
  border: 0px solid #ccc;
  border-radius: 4px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  margin-left: 10px;
  cursor: pointer;
`;

export const SettingsPopup = styled.div`
  position: absolute;
  top: 70px;
  right: 50px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const CalendarPopup = styled.div`
  position: absolute;
  top: 60px;
  left: 50px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* ocupa todo o espaço restante */
  min-height: 0; /* impede overflow automático */
  overflow-y: auto;
  width: 100%;
`;

export const CalendarHeader = styled.div`
  display: flex;
  grid-template-columns: 80px repeat(${(props) => (props.photographers?.length || 0)}, 1fr);
  gap: 1px;
  width: 100%;
  background-color: #fff;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 5;

  div {
    text-align: center;
    font-weight: bold;
  }
`;

export const HourLabel = styled.div`
  align-items: center;
  font-size: 1rem;
  margin-top: 1rem;
  min-width: 80px;
  height: 50px;
`;

export const AvatarList = styled.div`
  display: flex;
  width: 100%;
  height: 9vh;

  > div {    
    text-align: top;
    img {
      width: min(65px, max(40px, 10vw));
      height: min(65px, max(40px, 10vw)); 
      border-radius: 50%;
    }
  }
`;

export const AvatarItem = styled.div`
  width: min(70vw, 100%); /* Altura mínima de 10px, ajusta com o aumento da tela */   
  height: 100%;
  text-align: center;
   min-width: 50px; /* Garante que a largura mínima seja consistente */
`;

export const AvatarImage = styled.img`
  font-size: 0.5rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const AvatarName = styled.div`
  font-size: min(0.8rem, max(0.5rem, 2vw));
`;


/* ------------------------------------------------------------------------------------------------------------ */

export const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(${(props) => props.photographers?.length || 0}, 1fr);
  gap: 1px;
  width: 100%;
  overflow-x: auto;
  flex: 1;
  min-height: 0;
  padding: 10px;
  align-items: baseline;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(${props => props.numPhotographers}, 1fr);
  overflow-x: auto;
`;

export const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 80px;  
  font-size: 1rem;
  color: #999;
  > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#ddd'};
    height: min(4vh, 22px); /* Altura mínima de 10px, ajusta com o aumento da tela */       
    display: flex;
    align-items: center;
  }
`;

export const PhotographerColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-left: 1px solid #eee;
  min-width: 50px; /* Garante que a largura mínima seja consistente */
`;

export const EventCell = styled.div`
  height: ${(props) => props.height || 25}px; //
  padding: 0px;
  width: 100%;
  padding: 0px 4px;
`;

export const EventBlock = styled.div`
  background: ${(props) => props.color || '#ccc'};
  border-radius: 8px;
  padding: 1px 8px;
  font-size: 0.8rem;
  color: white;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const EmptyCell = styled.div`
  height: 40px;
  padding: 4px;
  width: 80px;
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #FFCA58;
  color: white;
  font-size: 2rem;
  border-radius: 50%;
  padding: 15px;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;





















