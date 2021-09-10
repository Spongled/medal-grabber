import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import medalLogo from './assets/img/medal.svg'
// import ErrorBoundary from './components/ErrorBoundary.js'
import Grabber from './components/Grabber.js'
import PerfectScrollbar from 'perfect-scrollbar';
import {ErrorBoundary} from 'react-error-boundary'


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
  // box-shadow: inset 0 0 0 1000px rgb(0 0 0 / 50%);
  background-color: rgb(0 0 0 / 100%);
  // This colour is applied over the background image. The image is transparent, meaning there's also a colour behind it in on the body tag. This is located in index.css. Use background-color: rgb(0 0 0 / 100%) to mimic official styling.
`
const GridContainer = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  grid-template-columns: 1.5fr 1.5fr 1.5fr;
  grid-template-rows: auto auto auto;
  // justify-items: center;
  // justify-content: center;
  // align-content: center;

  @media screen and (max-width: 1500px){
    grid-template-columns: 0.5fr 4fr 0.5fr;
  }
`
const ErrorGridContainer = styled(GridContainer)`
  grid-template-rows: auto 20rem auto;
`
const Content = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
`
const ErrorContent = styled(Content)`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 3;
`
const HeaderContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3.5rem;
  margin-bottom: 1rem;
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
const ErrorEmoji = styled.div`
  display: flex;
  font-size: 8rem;
  justify-items: center;
  justify-content: center;
  align-content: center;
`
const ErrorHeading = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
`
const ErrorMessage = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #fff;
  text-align: center;
`

function ErrorFallback() {

  useEffect(() => {
    setTimeout(function(){
      window.location.reload(1);
    }, 3000);
  });

  return (
    <Wrapper>
          <MainPanel>
            <ErrorGridContainer>
              <ErrorContent>
                  <ErrorEmoji>🤒</ErrorEmoji>
                  <ErrorHeading>Uh oh...</ErrorHeading>
                  <ErrorMessage>Looks like you input an invalid user ID, or something else broke. We'll refresh the page so you can try again!</ErrorMessage>
              </ErrorContent>
            </ErrorGridContainer>
          </MainPanel>
        </Wrapper>
  )
}


function App() {
  const mainPanelRef = useRef(null);
  useEffect(() => {
    var ps;
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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
