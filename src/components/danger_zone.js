import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

function DangerItem({ title, description, children }) {
  const t = typeof title === 'function' ? title() : title;
  const d = typeof description === 'function' ? description() : description;

  return (
    <Div>
      <Typography component="div" className="danger-item-info">
        <Typography component="h3" variant="h6" color="textPrimary" gutterBottom>
          {t}
        </Typography>
        <Typography component="p" variant="body1" color="textSecondary">
          {d}
        </Typography>
      </Typography>
      <Typography component="div" className="danger-item-action">
        {children}
      </Typography>
    </Div>
  );
}

DangerItem.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.any.isRequired,
  description: PropTypes.any.isRequired,
};

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .danger-item-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .danger-item-action {
    width: 0px;
    flex-shrink: 0;
    text-align: right;
    cursor: pointer;
  }
`;

function DangerZone({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

const Container = styled.div`
  border: 1px solid #dedede;
  padding: 16px;
`;

DangerZone.propTypes = { children: PropTypes.node.isRequired };

export { DangerZone, DangerItem };
