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

  return (
    <BaseLayout addons={<LocaleSelector showText={false} />}>
      <Content>
        <div className="intro">
          <h1>Blocklet Launcher</h1>
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
