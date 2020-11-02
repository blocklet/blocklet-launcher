import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import CodeBlock from '@arcblock/ux/lib/CodeBlock';
import ClickToCopy from '@arcblock/ux/lib/ClickToCopy';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} {...other}>
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    height: 'auto',
  },
}));

export default function SimpleTabs({ params }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { t } = useContext(LocaleContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const imgUrl = 'https://raw.githubusercontent.com/play-with-docker/stacks/master/assets/images/button.png';
  const linkUrl = `https://labs.play-with-docker.com/?stack=${params.url}`;

  const markdown = `[![Install On ABT Node](${imgUrl})](${linkUrl})`;

  const html = `<a href="${linkUrl}"><img src="${imgUrl}" alt="Install On ABT Node"></a>`;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" style={{ height: 'auto', boxShadow: 'none' }}>
        <Tabs value={value} onChange={handleChange} style={{ boxShadow: 'none' }}>
          <Tab label="Markdown" {...a11yProps(0)} />
          <Tab label="HTML" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} style={{ padding: 0 }} component="div">
        <Div>
          <img src={imgUrl} alt="Install On ABT Node" />

          <ClickToCopy content={markdown}>{t('common.copy')}</ClickToCopy>
        </Div>
        <CodeBlockDiv language="kotlin">{markdown}</CodeBlockDiv>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Div>
          <img src={imgUrl} alt="Install On ABT Node" />

          <ClickToCopy content={html}>{t('common.copy')}</ClickToCopy>
        </Div>
        <CodeBlockDiv language="kotlin">{html}</CodeBlockDiv>
      </TabPanel>
    </div>
  );
}

SimpleTabs.propTypes = {
  params: PropTypes.object,
};

SimpleTabs.defaultProps = {
  params: {
    url: '',
  },
};

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const CodeBlockDiv = styled(CodeBlock)`
  overflow: auto;
`;
