import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Container from '@material-ui/core/Container';

function CustomStepIcon({ active, completed }) {
  const urlParams = new URLSearchParams(window.location.search);
  const { changeLocale, locale } = useLocaleContext();

  useEffect(() => {
    changeLocale(urlParams.get('__blang__') || locale);
  });

  if (completed) {
    return (
      <img className="MuiSvgIcon-root MuiStepIcon-root MuiStepIcon-completed" src="/images/checked.svg" alt="checked" />
    );
  }

  if (active) {
    return (
      <img className="MuiSvgIcon-root MuiStepIcon-root MuiStepIcon-active" src="/images/unchecked.svg" alt="checked" />
    );
  }

  return <FiberManualRecordIcon color="disabled" />;
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};

function Layout({ children }) {
  const { t } = useLocaleContext();

  return (
    <Div>
      <div className="nav-sidebar">
        <Stepper className="stepper" activeStep={0} orientation="vertical">
          <Step key="select-node">
            <StepLabel StepIconComponent={CustomStepIcon}>{t('launch.selectAbtNode')}</StepLabel>
          </Step>
          <Step key="launch-app">
            <StepLabel StepIconComponent={CustomStepIcon}>{t('launch.launchApp')}</StepLabel>
          </Step>
        </Stepper>
      </div>
      <Container className="content" maxWidth="lg">
        {children}
      </Container>
    </Div>
  );
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

const Div = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 100px;
  }

  .nav-sidebar {
    padding: 40px;
    border-right: 1px solid #f0f0f0;
    width: 15%;
    background: #fbfcfd;
  }

  .stepper {
    padding: 0;
    background: transparent;
    margin-top: 100px;

    .step {
      cursor: pointer;
    }
  }
`;

const Center = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Layout;

export { Center };
