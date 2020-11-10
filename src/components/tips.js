/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Typography from '@material-ui/core/Typography';
import { DangerZone, DangerItem } from './danger_zone';

export default function RegisterNode() {
  const { t } = useLocaleContext();

  const description = () => {
    const steps = [t('tips.steps.one'), t('tips.steps.two'), t('tips.steps.three'), t('tips.steps.four')];

    return (
      <DescriptionDiv>
        <>
          {steps.map((step) => (
            <div className="step" key={step}>
              {step}
            </div>
          ))}
        </>
        <Typography component="h6" variant="h6" className="tips">
          {t('tips.setup')}
        </Typography>
        <Typography component="h6" variant="h6" className="tips">
          {t('tips.visit')}
        </Typography>
      </DescriptionDiv>
    );
  };
  return (
    <React.Fragment>
      <DangerZone className="danger-zone">
        <DangerItem title={t('tips.title')} description={description} />
      </DangerZone>
    </React.Fragment>
  );
}

const DescriptionDiv = styled.div`
  .step {
    margin: 5px 0 5px 20px;
  }

  .tips {
    margin: 15px 0;
    font-size: 16px;
  }
`;
