import React from 'react';
import useQuery from '../hooks/query';
import { getBlockletMetaUrl, getEnvironment } from '../libs/utils';

export default function NewNode() {
  const query = useQuery();

  const blockletMetaUrl = getBlockletMetaUrl(query);

  const launchUrlObject = new URL(getEnvironment('LAUNCHER_URL'));
  launchUrlObject.searchParams.append('blocklet_meta_url', blockletMetaUrl);
  launchUrlObject.searchParams.append('content_type', 'bare');

  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `<iframe width="1280px" height="1080px" frameborder="0" border="0" cellspacing="0" src='${launchUrlObject.toString()}' />`,
      }}
    />
  );
}
