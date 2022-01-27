import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@arcblock/ux/lib/Button';
import BaseLayout from '@arcblock/ux/lib/Layout';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import CookieConsent from '@arcblock/ux/lib/CookieConsent';

import useQuery from '../hooks/query';
import { useInstances } from '../hooks/instances';

export default function Home() {
  const { t, locale } = useLocaleContext();
  const history = useHistory();
  const query = useQuery();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [instances, dispatchInstances] = useInstances();

  if (query.get('meta_url')) {
    history.push(`/launch${window.location.search}`);
  }

  const info = query.get('info');
  if (query.get('action') === 'node-register' && info) {
    try {
      const infoData = JSON.parse(info);

      let contentEle;

      const targetNode = instances.find((e) => e.did === infoData.did);

      const updateNode = () => {
        dispatchInstances({
          type: 'register',
          result: infoData,
        });

        setIsUpdate(true);
      };

      if (!targetNode) {
        dispatchInstances({
          type: 'register',
          result: infoData,
        });

        setIsRegister(true);
      } else if (isRegister) {
        contentEle = (
          <div className="intro">
            <h1>{t('home.addSucceed', { name: infoData.name })}</h1>
          </div>
        );
      } else if (isUpdate) {
        contentEle = (
          <div className="intro">
            <h1>{t('home.updateSucceed', { name: infoData.name })}</h1>
          </div>
        );
      } else if (targetNode.url !== infoData.url) {
        contentEle = (
          <div className="intro">
            <h1>
              {t('home.updateDesc', {
                name: infoData.name,
              })}
            </h1>
            <div className="intro__desc">
              <Button className="intro__start" color="primary" rounded variant="contained" onClick={() => updateNode()}>
                {t('common.update')}
              </Button>
            </div>
          </div>
        );
      } else {
        contentEle = (
          <div className="intro">
            <h1>{t('home.added', { name: infoData.name })}</h1>
          </div>
        );
      }

      return (
        <BaseLayout addons={<LocaleSelector showText={false} />}>
          <Content>{contentEle}</Content>
          <CookieConsent locale={locale} />
        </BaseLayout>
      );
    } catch (e) {
      console.error('parse info error', e);
    }
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
