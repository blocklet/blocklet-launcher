import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import styled from 'styled-components';
import GuideGallery from '../guide-gallery';

import img1cn from './imgs/cn/1.jpg';
import img2cn from './imgs/cn/2.jpg';
import img3cn from './imgs/cn/3.jpg';
import img1en from './imgs/en/1.jpg';
import img2en from './imgs/en/2.jpg';
import img3en from './imgs/en/3.jpg';

export default function AddServerGuide({ open, onClose }) {
  const { t, locale } = useLocaleContext();

  const isEN = locale === 'en';

  const tutorial = [
    {
      pic: isEN ? img1en : img1cn,
      desc: t('addServerGuide.descOne'),
    },
    {
      pic: isEN ? img2en : img2cn,
      desc: t('addServerGuide.descTwo'),
    },
    {
      pic: isEN ? img3en : img3cn,
      desc: t('addServerGuide.descThree'),
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <Container>
        <GuideGallery tutorial={tutorial} />
      </Container>
    </Dialog>
  );
}

const Container = styled.div`
  width: 80vw;
  height: 80vh;
`;

AddServerGuide.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

AddServerGuide.defaultProps = {
  open: false,
  onClose: () => {},
};
