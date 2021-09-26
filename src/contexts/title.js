import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const TitleContext = createContext({});
const { Provider } = TitleContext;

function TitleProvider({ children }) {
  const [pageHeader, setPageHeader] = useState('');

  const set = ({ pHeader }) => {
    setPageHeader(pHeader);
  };

  return <Provider value={{ pageHeader, set }}>{children}</Provider>;
}

function useTitleContext() {
  return useContext(TitleContext);
}

TitleProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { TitleProvider, useTitleContext };
