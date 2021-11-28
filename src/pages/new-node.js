import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Spinner from '@arcblock/ux/lib/Spinner';
import useQuery from '../hooks/query';
import { getBlockletMetaUrl, getEnvironment } from '../libs/utils';

export default function NewNode() {
  const query = useQuery();
  const ref = useRef();
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState('0');
  const [height, setHeight] = useState('0');

  const blockletMetaUrl = getBlockletMetaUrl(query);

  const launchUrlObject = new URL(getEnvironment('LAUNCHER_URL'));
  launchUrlObject.searchParams.append('blocklet_meta_url', blockletMetaUrl);
  launchUrlObject.searchParams.append('content_type', 'bare');

  const handleLoaded = () => setLoading(false);

  const handleResize = () => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.parentElement.getBoundingClientRect();
    // 加载完成后可以更准确地计算父容器长宽
    if (!loading) {
      setWidth(`${rect.width}px`);
      setHeight(`${rect.height}px`);
    }
  };

  useEffect(() => {
    handleResize();
  }, [loading]);

  return (
    <Div ref={ref}>
      {loading && <Spinner />}
      <iframe
        onLoad={handleLoaded}
        title="purchase blocklet server"
        width={width}
        height={height}
        frameBorder="0"
        border="0"
        cellSpacing="0"
        src={launchUrlObject.toString()}
      />
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding-bottom: 20px;
`;
