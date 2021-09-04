import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import medalLogo from './assets/img/medal.svg'
import ErrorBoundary from './components/ErrorBoundary.js'
import Grabber from './components/Grabber.js'
import PerfectScrollbar from 'perfect-scrollbar';
var ps;

const Wrapper = styled.div`
  position: relative;
  top: 0;
  height: 100vh;
`

const MainPanel = styled.div`
  border-top: 2px solid #FFB84B;
  
  // height: 100%;
  max-height: 19vh !important;
   
  // overflow: hidden !important;
  // overflow-anchor: none;
  // touch-action: auto;

  width: 100%;
  background-image: url(https://cdn.medal.tv/games/background/background-default.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  // background-attachment: fixed;
  top: 0px;
  // left: 0px;
  min-width: 100vw;
  min-height: 100vh;
  box-shadow: inset 0 0 0 1000px rgb(0 0 0 / 50%);
  // This colour is applied over the background image. The image is transparent, meaning there's also a colour behind it in on the body tag. This is located in index.css. Use background-color: rgb(0 0 0 / 100%) to mimic official styling.
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // align-content: center;
`
const HeaderContent = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.5rem;
`
const MedalLogo = styled.img`
  vertical-align: middle;
  width: 75px;
  margin-right: 15px;
`
const MedalHeader = styled.header`
  display: inline;
  vertical-align: middle;
  font-size: 2.5rem;
  letter-spacing: 10px;
  color: #fff;
`
function App() {
  const mainPanelRef = useRef(null);
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });

  return (
    <ErrorBoundary>
      <Wrapper>
        <MainPanel ref={mainPanelRef} className="main-panel">
          <Content>
            <HeaderContent>
              <MedalLogo src={medalLogo} alt="Medal.tv Logo"/>
              <MedalHeader>GRABBER</MedalHeader>
            </HeaderContent>
            <Grabber/>
          </Content>
        </MainPanel>
      </Wrapper>
    </ErrorBoundary>
  );
}

export default App;
