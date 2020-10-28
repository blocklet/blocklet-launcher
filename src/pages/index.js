import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CropFreeIcon from '@material-ui/icons/CropFree';
import SettingsIcon from '@material-ui/icons/Settings';
import FundIcon from '@material-ui/icons/Redeem';
import CompleteIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';

import Auth from '@arcblock/did-react/lib/Auth';
import Button from '@arcblock/ux/lib/Button';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';

import SetupForm from './form';
import Layout from '../components/layout';
import api from '../libs/api';

// eslint-disable-next-line react/prop-types
function ColorStepIcon({ icon, active, completed }) {
  const icons = {
    1: <SettingsIcon className="step-icon" />,
    2: <CropFreeIcon className="step-icon" />,
    3: <FundIcon className="step-icon" />,
    4: <CompleteIcon className="step-icon" />,
  };

  const classNames = ['step-icon-w'];
  if (active) {
    classNames.push('step-icon-w--active');
  }
  if (completed) {
    classNames.push('step-icon-w--completed');
  }

  return <div className={classNames.join(' ')}>{icons[String(icon)]}</div>;
}

export default function IndexPage() {
  const { t, locale, changeLocale } = useContext(LocaleContext);

  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('__blang__') != null) {
    changeLocale(urlParams.get('__blang__'));
  }

  let defaultActiveStep = 0;
  const [activeStep, setActiveStep] = useState(defaultActiveStep);
  const [userDid, setUserDid] = useState(null);
  const [chainHost, setChainHost] = useState(null);
  const [chainId, setChainId] = useState(null);

  const onNext = () => {
    setActiveStep(activeStep + 1);
  };

  const onBack = () => {
    setActiveStep(activeStep - 1);
  };

  const renderLogin = () => {
    const onLoginSuccess = (result) => {
      setTimeout(() => {
        setUserDid(result.did);
        setActiveStep(activeStep + 1);
      }, 1000);
    };

    return (
      <Auth
        disableClose
        key="login"
        className="stepper-auth"
        responsive={false}
        action="login"
        checkFn={api.get}
        checkTimeout={10 * 60 * 1000}
        onSuccess={onLoginSuccess}
        extraParams={{ chainId, chainHost }}
        locale={locale}
        messages={{
          title: t('onboard.dialog.title'),
          scan: t('onboard.dialog.scan'),
          confirm: t('onboard.dialog.confirm'),
          success: t('onboard.dialog.success'),
        }}
      />
    );
  };

  const renderPoke = () => {
    const onPokeSuccess = (result) => {
      setTimeout(() => {
        setActiveStep(activeStep + 1);
      }, 1000);
    };

    return (
      <Auth
        key="poke"
        disableClose
        className="stepper-auth"
        responsive={false}
        action="poke"
        checkFn={api.get}
        checkTimeout={10 * 60 * 1000}
        onSuccess={onPokeSuccess}
        extraParams={{ chainId, chainHost }}
        locale={locale}
        messages={{
          title: t('onboard.poke.title'),
          scan: t('onboard.poke.scan'),
          confirm: t('onboard.poke.confirm'),
          success: t('onboard.poke.success'),
        }}
      />
    );
  };

  const renderForm = () => {
    const onSaved = (result) => {
      setTimeout(() => {
        setChainHost(result.chainHost);
        setChainId(result.chainId);
        setActiveStep(activeStep + 1);
      }, 1000);
    };

    return <SetupForm onSaved={onSaved} title={t('onboard.form.title')} submit={t('onboard.form.submit')} />;
  };

  const goBlockExplorer = () => {
    if (userDid === null || chainHost === null) {
      return;
    }
    const url = chainHost.replace('/api', '') + '/node/explorer/accounts/' + userDid;
    window.open(url, '_blank');
  };
  const renderComplete = () => (
    <div style={{ textAlign: 'center' }}>
      <img className="stepper-icon" src="./static/images/celebrate.png" alt="Congratulations" />
      <Typography component="h2" variant="h5" className="stepper-tip">
        {t('onboard.congratulation')}
      </Typography>
      <Button rounded variant="contained" color="primary" size="large" onClick={goBlockExplorer}>
        {t('onboard.redirectButton')}
      </Button>
    </div>
  );

  const steps = [
    {
      label: t('onboard.steps.select'),
      content: renderForm,
    },
    {
      label: t('onboard.steps.connect'),
      content: renderLogin,
    },
    {
      label: t('onboard.steps.poke'),
      content: renderPoke,
    },
    {
      label: t('onboard.steps.complete'),
      content: renderComplete,
    },
  ];

  return (
    <Layout title="Home">
      <Main>
        <Div className="locale-selector-container">
          <LocaleSelector size={26} showText={false} className="locale-addon" />
        </Div>
        <Div>
          <Typography component="h2" variant="h3" className="header">
            {t('onboard.title')}
          </Typography>
          <Paper className="stepper">
            <Stepper className="stepper-progress" alternativeLabel activeStep={activeStep}>
              {steps.map(({ label }) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className="stepper-content">{steps[activeStep].content()}</div>
            <div className="stepper-actions">
              <Button rounded disabled={activeStep === 0} onClick={onBack} className="step-button">
                {t('common.back')}
              </Button>
              <Button rounded variant="contained" color="primary" onClick={onNext} className="step-button">
                {activeStep === steps.length - 1 ? t('common.finish') : t('common.next')}
              </Button>
            </div>
          </Paper>
        </Div>
      </Main>
    </Layout>
  );
}

const Main = styled.main`
  a {
    color: ${(props) => props.theme.colors.green};
    text-decoration: none;
  }

  .locale-selector-container {
    display: flex;
    justify-content: flex-end;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .page-description {
    margin-bottom: 30px;
  }

  .section {
    margin-bottom: 32px;
    padding: 0;
    .section__header {
      margin-bottom: 16px;
    }
  }

  .demos {
    .demo {
      height: 240px;
      @media (max-width: ${(props) => props.theme.breakpoints.values.md - 1}px) {
        height: auto;
      }
    }
  }
`;

const Div = styled(Container)`
  .header {
    text-align: center;
    margin-bottom: 24px;
  }

  .stepper {
    padding: 24px;
    height: auto;
    min-height: 640px;
    display: flex;
    flex-direction: column;

    .stepper-progress {
      padding: 0;
      flex: 0;
      margin-bottom: 24px;

      .MuiStepLabel-label.MuiStepLabel-alternativeLabel {
        margin-top: 8px;
      }

      .MuiStepConnector-alternativeLabel {
        top: 24px;
      }

      .MuiStepConnector-lineHorizontal {
        height: 3px;
        border: none;
        background-color: #eaeaf0;
        border-radius: 1px;
      }

      .step-icon-w {
        background-color: ${(props) => props.theme.colors.minor};
        z-index: 1;
        color: ${(props) => props.theme.colors.white};
        width: 50px;
        height: 50px;
        display: flex;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        .step-icon {
          font-size: 30px;
        }
      }

      .step-icon-w--active {
        background-color: ${(props) => props.theme.colors.blue};
      }

      .step-icon-w--completed {
        background-color: ${(props) => props.theme.colors.secondary};
      }
    }

    .stepper-content {
      padding: 0 64px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 24px;

      .stepper-auth {
        padding: 0;

        .auth-title {
          margin-bottom: 16px;
        }
      }

      .stepper-tip {
        text-align: center;
        margin-bottom: 16px;
      }
    }

    .stepper-actions {
      flex: 0;
      text-align: right;
      padding: 0 64px;
      display: none;
      .step-button {
        margin-right: 8px;
      }
    }
  }
`;
