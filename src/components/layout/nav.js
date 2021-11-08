import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import joinUrl from 'url-join';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import PendingIcon from '@arcblock/icons/lib/Pending';
import { Link, Step, StepLabel, Stepper } from '@material-ui/core';
import { Done as DoneIcon, FiberManualRecord as FiberManualRecordIcon } from '@material-ui/icons';
import AppHeader from '../app-header';
import { getBlockletLogoUrl } from '../../libs/utils';

function CustomStepIcon({ active, completed }) {
  if (completed) {
    return <DoneIcon style={{ color: '#31AB86' }} />;
  }

  if (active) {
    return <PendingIcon color="#4F6AF6" />;
  }

  return <FiberManualRecordIcon color="disabled" />;
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};

function Nav({ blockletMeta }) {
  const { t } = useLocaleContext();

  return (
    <Div className="nav-sidebar">
      <AppHeader
        title={blockletMeta.data.title}
        subTitle={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Link target="_blank" href={joinUrl(blockletMeta.registryUrl, `/blocklet/${blockletMeta.data.did}`)}>
            {t('launch.openInRegistry')}
          </Link>
        }
        logoUrl={getBlockletLogoUrl({
          did: blockletMeta.data.did,
          baseUrl: blockletMeta.registryUrl,
          logoPath: blockletMeta.data.logo,
        })}
      />
      <Stepper className="stepper" activeStep={0} orientation="vertical">
        <Step key="select-node">
          <StepLabel StepIconComponent={CustomStepIcon}>{t('launch.selectAbtNode')}</StepLabel>
        </Step>
        <Step key="launch-app">
          <StepLabel StepIconComponent={CustomStepIcon}>{t('launch.launchApp')}</StepLabel>
        </Step>
      </Stepper>
    </Div>
  );
}

const Div = styled.div`
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: 40px;
    border-right: 1px solid #f0f0f0;
    width: 30%;
    background: #fbfcfd;
    min-height: 48px;
  }

  ${(props) => props.theme.breakpoints.up('sm')} {
    .MuiStepConnector-vertical {
      padding: 0;
    }
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 16px;

    .MuiStepConnector-lineVertical {
      border: none;
    }
  }

  .stepper {
    padding: 0 !important;
    background: transparent;

    ${(props) => props.theme.breakpoints.up('sm')} {
      margin-top: 100px;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      margin-top: 40px;
    }

    .step {
      cursor: pointer;
    }
  }
`;

Nav.propTypes = {
  blockletMeta: PropTypes.object.isRequired,
};

export default Nav;
