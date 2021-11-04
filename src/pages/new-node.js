import React, { useState } from 'react';
import Spinner from '@arcblock/ux/lib/Spinner';
import useQuery from '../hooks/query';
import { getBlockletMetaUrl, getEnvironment } from '../libs/utils';

export default function NewNode() {
  const query = useQuery();
  const [loading, setLoading] = useState(true);

  const blockletMetaUrl = getBlockletMetaUrl(query);

  const launchUrlObject = new URL(getEnvironment('LAUNCHER_URL'));
  launchUrlObject.searchParams.append('blocklet_meta_url', blockletMetaUrl);
  launchUrlObject.searchParams.append('content_type', 'bare');

  const handleLoaded = () => setLoading(false);

  return (
    <div>
      {loading && <Spinner />}
      <iframe
        onLoad={handleLoaded}
        title="purchase abt node"
        width="800px"
        height="800px"
        frameBorder="0"
        border="0"
        cellSpacing="0"
        src={launchUrlObject.toString()}
      />
    </div>
  );
}
