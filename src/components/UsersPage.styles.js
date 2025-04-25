import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 16px;  
  max-width: none; 
`;

export const StyledTable = styled.table`
  width: 100%;
  padding: 0;
  margin: 0 auto;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.colors.surface};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 0.9rem;
`;

export const TableCell = styled.td`
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(0.7rem, 2vw, 1rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

export const DetailButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.onPrimary};
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0px;
  margin-right: 8px;
  color: ${({ delete: isDelete, theme }) =>
    isDelete ? theme.colors.danger || 'red' : theme.colors.primary || 'black'};

  &:hover {
    opacity: 0.7;
  }
`;
