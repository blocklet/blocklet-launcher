import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';

const StepContext = createContext();
const { Provider } = StepContext;

function StepProvider({ children }) {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLocaleContext();

  const [steps] = useState([
    {
      key: 'select-node',
      name: t('launch.selectAbtNode'),
      path: '/launch',
    },
    {
      key: 'create-node',
      name: t('launch.createAbtNode'),
      path: '/launch/new',
      optional: true,
    },
    {
      key: 'launch-app',
      name: t('launch.launchApp'),
      path: '',
    },
  ]);

  useEffect(() => {
    const stepIndex = steps.findIndex((step) => step.path === window.location.pathname);
    setActiveStep(stepIndex);
    return () => {};
  }, [steps, window.location.pathname]);

  const value = {
    steps,
    activeStep: activeStep + 1,
    totalStepsCount: steps.length,
  };

  return <Provider value={value}>{children}</Provider>;
}

function useStepContext() {
  return useContext(StepContext);
}

StepProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { StepProvider, useStepContext };
