/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export default function RegisterNode() {
  const { t } = useLocaleContext();

  const description = () => {
    const steps = [t('tips.steps.one'), t('tips.steps.two'), t('tips.steps.three'), t('tips.steps.four')];

    return (
      <DescriptionDiv>
        <ol>
          {steps.map((step) => (
            <li className="step" key={step}>
              {step}
            </li>
          ))}
        </ol>

        <Typography component="span" variant="span" className="tips">
          {t('tips.setup')}
        </Typography>
        <a href="https://www.arcblock.io/en/get-started" rel="noreferrer" target="_blank">
          {t('tips.visit')}
        </a>
      </DescriptionDiv>
    );
  };
  return (
    <Div>
      <Alert severity="info" className="info">
        <AlertTitle>{t('tips.title')}</AlertTitle>
        <Typography>{description()}</Typography>
      </Alert>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10vh;

  .info {
    width: 560px;
  }
`;

const DescriptionDiv = styled.div`
  li {
    list-style: inherit;
  }

  .step {
    margin: 5px 0;
  }

  .tips {
    margin: 15px 0;
    font-size: 16px;
  }
`;
