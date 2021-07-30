import styled from 'styled-components';
import { device } from './device';

const AppStyle = styled.div`
  margin: auto;
  font-family: "sans-serif";
  text-align: center;

  @media ${device.tablet} { 
    max-width: ${device.tablet};
    text-align: center;
  }

  @media ${device.laptop} { 
    max-width: ${device.laptop};
    text-align: center;

  }

  @media ${device.laptopL} { 
    max-width: ${device.laptopL};
    text-align: center;

  }

  @media ${device.desktopL} {
    max-width: 2560px;
    text-align: right;
  }
`;


export default AppStyle;
