import React from 'react';
import MUIDataTable from 'mui-datatables';
import styled from 'styled-components';

export default function Table(args) {
  const { style, className, ...props } = args;
  return (
    <Container style={style} className={className}>
      <MUIDataTable {...props} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

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
