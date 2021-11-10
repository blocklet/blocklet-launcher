import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const StepContext = createContext();
const { Provider } = StepContext;

function StepProvider({ children, steps }) {
  const [activeStep, setActiveStep] = useState(0);

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
  steps: PropTypes.array.isRequired,
};

export { StepProvider, useStepContext };
