const { createGlobalStyle } = require('styled-components');

const GlobalStyle = createGlobalStyle`
body {
  background-color: #ffffff;
  font-weight: 500;
}

a {
  color: ${(props) => props.theme.colors.green};
  text-decoration: none !important;
}

ul, li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.MuiButton-outlinedPrimary {
  fill: ${(props) => props.theme.palette.primary.main};
  color: #4E6AF6;
  background: #F4F6FF;
  border: 0;
  &:hover {
    border: 0;
  }
}

.MuiButton-textPrimary {
  color: #4F6AF6 !important; // FIXME: 比较奇怪，createGlobalStyle 没有 material ui 样式的优先级高
}

.bold {
  font-size: 18px;
  line-height: 21px;
  color: #222222;
}

.light {
  font-size: 14px;
  line-height: 16px;
  color: #666666;
}
`;

export default GlobalStyle;
