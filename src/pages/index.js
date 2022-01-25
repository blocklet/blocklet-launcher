import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@arcblock/ux/lib/Button';
import BaseLayout from '@arcblock/ux/lib/Layout';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import CookieConsent from '@arcblock/ux/lib/CookieConsent';

import useQuery from '../hooks/query';

export default function Home() {
  const { t, locale } = useLocaleContext();
  const history = useHistory();
  const query = useQuery();

  if (query.get('meta_url')) {
    history.push(`/launch${window.location.search}`);
  }

  if (query.get('action') === 'node-register') {
    const info = query.get('info');
    let infoData;
    try {
      infoData = JSON.parse(info);
    } catch (e) {
      console.error('parse info error', e);
    }

    let contentEle;

    const localServers = localStorage.localServers ? JSON.parse(localStorage.localServers) : [];

    if (!localServers.find((e) => e.did === infoData.did)) {
      localServers.push(infoData);
      localStorage.setItem('localServers', JSON.stringify(localServers));

      contentEle = (
        <div className="intro">
          <h1>添加 {infoData.name} 成功</h1>
        </div>
      );
    } else {
      contentEle = (
        <div className="intro">
          <h1>{infoData.name} 已添加</h1>
        </div>
      );
    }

    return (
      <BaseLayout addons={<LocaleSelector showText={false} />}>
        <Content>{contentEle}</Content>
        <CookieConsent locale={locale} />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout addons={<LocaleSelector showText={false} />}>
      <Content>
        <div className="intro">
          <h1>{t('home.name')}</h1>
          <div className="intro__desc">
            <div>{t('home.intro')}</div>
            <Button
              className="intro__start"
              color="primary"
              rounded
              variant="contained"
              href="https://store.blocklet.dev/">
              {t('common.start')}
            </Button>
          </div>
        </div>
      </Content>
      <CookieConsent locale={locale} />
    </BaseLayout>
  );
}

const Content = styled.div`
  margin-top: 100px;

  .intro {
    .intro__desc {
      margin-top: 32px;
      font-size: 18px;
      font-weight: normal;
    }

    .intro__start {
      margin-top: 16px;
      width: 200px;
    }
  }
`;
