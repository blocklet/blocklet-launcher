import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import Button from '@arcblock/ux/lib/Button';

import Confirm from '../components/confirm';
import Layout from '../components/layout/index';
import TablbeList from '../components/abtnode/list';
import useSettingConfirm from '../components/confirm_config';

import { isObjectFn } from '../libs/utils';

export default function IndexPage() {
  const { t, changeLocale } = useContext(LocaleContext);
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('__blang__') != null) {
    changeLocale(urlParams.get('__blang__'));
  }

  const [abtnodes, setAbtnodes] = useLocalStorage('abtnodes');
  const [currentSetting, setCurrentSetting] = useState(null);
  const [settings, setSettings] = useState(useSettingConfirm());

  settings.inputUrlToGenerateLinkSetting.onConfirm = () => {
    settings.generateLinkSetting.params = {
      info: 'wwwwwwwww',
    };

    setSettings(settings);
    setCurrentSetting('generateLinkSetting');
  };
  settings.inputUrlToGenerateLinkSetting.onCancel = () => {
    setCurrentSetting(null);
  };

  settings.generateLinkSetting.onConfirm = () => {
    setCurrentSetting(null);
  };
  settings.generateLinkSetting.onCancel = () => {
    setCurrentSetting('inputUrlToGenerateLinkSetting');
  };

  settings.addABTNodeSetting.onConfirm = () => {
    setCurrentSetting(null);
  };
  settings.addABTNodeSetting.onCancel = () => {
    setCurrentSetting(null);
  };

  const onAdd = () => {
    setCurrentSetting('addABTNodeSetting');
  };

  const onDelete = (id) => {
    delete abtnodes[id];
    setAbtnodes({
      ...abtnodes,
    });
  };

  const onGenerateInstallUrl = () => {
    setCurrentSetting('inputUrlToGenerateLinkSetting');
  };

  const rows = isObjectFn(abtnodes) ? Object.values(abtnodes) : [];
  return (
    <Layout title="Home">
      <Action>
        <Button rounded color="primary" variant="contained" onClick={onAdd}>
          {t('abtnode.add')}
        </Button>
        <Button
          className="generate-url-btn"
          rounded
          color="secondary"
          variant="contained"
          onClick={onGenerateInstallUrl}>
          {t('generate.add')}
        </Button>
      </Action>
      <Main>
        <TablbeList rows={rows} onDelete={onDelete} />

        {currentSetting && settings[currentSetting] && (
          <Confirm
            title={settings[currentSetting].title}
            description={settings[currentSetting].description}
            confirm={settings[currentSetting].confirm}
            color={settings[currentSetting].color}
            cancel={settings[currentSetting].cancel}
            params={settings[currentSetting].params}
            onConfirm={settings[currentSetting].onConfirm}
            onCancel={settings[currentSetting].onCancel}
            open={settings[currentSetting].open}
          />
        )}
      </Main>
    </Layout>
  );
}

const Main = styled.main`
  a {
    color: ${(props) => props.theme.colors.green};
    text-decoration: none;
  }

  > .MuiPaper-root {
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
    background-color: transparent;
  }

  .MuiToolbar-root {
    background: transparent;
    padding-left: 0px;
  }

  .MuiTableHead-root th {
    background: transparent;
    min-width: 100px;
  }

  .MuiTableCell-root {
    padding-right: 16px;
    &:last-of-type {
      padding-right: 0;
    }
  }
`;

const Action = styled.div`
  display: flex;
  justify-content: flex-end;

  .generate-url-btn {
    margin-left: 10px;
  }
`;
