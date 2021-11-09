import React, { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    const rect = ref.current.parentElement.getBoundingClientRect();
    setWidth(`${rect.width}px`);
    setHeight(`${rect.height - 10}px`);
  }, []);

  return (
    <div ref={ref}>
      {loading && <Spinner />}
      <iframe
        onLoad={handleLoaded}
        title="purchase abt node"
        width={width}
        height={height}
        frameBorder="0"
        border="0"
        cellSpacing="0"
        src={launchUrlObject.toString()}
      />
    </div>
  );
}
