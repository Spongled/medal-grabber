import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import medalLogo from './assets/img/medal.svg'
import ErrorBoundary from './components/ErrorBoundary.js'
import Grabber from './components/Grabber.js'
import PerfectScrollbar from 'perfect-scrollbar';

const Wrapper = styled.div`
  position: relative;
  top: 0;
  height: 100vh;
`
const MainPanel = styled.div`
  border-top: 2px solid #FFB84B;
  max-height: 100% !important;
  width: 100%;
  background-image: url(https://cdn.medal.tv/games/background/background-default.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0px;
  min-width: 100vw;
  min-height: 100vh;
  box-shadow: inset 0 0 0 1000px rgb(0 0 0 / 50%);
  // This colour is applied over the background image. The image is transparent, meaning there's also a colour behind it in on the body tag. This is located in index.css. Use background-color: rgb(0 0 0 / 100%) to mimic official styling.
`
const GridContainer = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  grid-template-columns: 1.5fr 2.5fr 1.5fr;
  grid-template-rows: auto auto auto;
  justify-items: center;
  justify-content: center;
  align-content: center;

  @media screen and (max-width: 1024px){
    grid-template-columns: 0.5fr 4fr 0.5fr;
  }
`
const Content = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
`
const HeaderContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.5rem;
  justify-content: center;
`
const MedalLogo = styled.img`
  vertical-align: middle;
  width: 70px;
  margin-right: 15px;
`
const GrabberTitle = styled.header`
  display: inline;
  vertical-align: middle;
  font-size: 2.5rem;
  letter-spacing: 10px;
  color: #fff;
`

function App() {
  var ps;
  const mainPanelRef = useRef(null);
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  return (
    <ErrorBoundary>
      <Wrapper>
        <MainPanel ref={mainPanelRef}>
          <HeaderContainer>
            <MedalLogo src={medalLogo} alt="Medal.tv logo"/>
            <GrabberTitle>GRABBER</GrabberTitle>
          </HeaderContainer>
          <GridContainer>
            <Content>
              <Grabber/>
            </Content>
          </GridContainer>
        </MainPanel>
      </Wrapper>
    </ErrorBoundary>
  );
}

export default App;
