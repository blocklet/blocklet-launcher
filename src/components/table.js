import React from 'react';
import MUIDataTable from 'mui-datatables';
import styled from 'styled-components';

export default function Table(args) {
  return (
    <Container>
      <MUIDataTable {...args} />
    </Container>
  );
}

const Container = styled.div`
  .MuiPaper-root {
    background-color: transparent;
    box-shadow: none;
    padding-left: 0;
  }

  .MuiTableRow-root th {
    background: transparent;
  }

  .MuiTableCell-root {
    @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
      &:first-of-type {
        padding-left: ${(props) => props.theme.spacing(3)}px;
      }

      &:last-of-type {
        text-align: center;
      }
    }
  }
`;
