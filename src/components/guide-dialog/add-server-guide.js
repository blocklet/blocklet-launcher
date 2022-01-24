import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import GuideGallery from './guide-gallery';

import img1 from './imgs/cn/1.jpg';
import img2 from './imgs/cn/2.jpg';
import img3 from './imgs/cn/3.jpg';

export default function AddServerGuide({ open, onClose }) {
  const { t } = useLocaleContext();
  const tutorial = [
    {
      pic: img1,
      desc: t('addServerGuide.descOne'),
    },
    {
      pic: img2,
      desc: t('addServerGuide.descTwo'),
    },
    {
      pic: img3,
      desc: t('addServerGuide.descThree'),
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} style={{ zIndex: 1402 }}>
      <GuideGallery tutorial={tutorial} />
    </Dialog>
  );
}

AddServerGuide.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

AddServerGuide.defaultProps = {
  open: false,
  onClose: () => {},
};
