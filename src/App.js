import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Grabber from './components/Grabber.js'
import Footer from './components/Footer.js'
import Help from './components/Help.js'
import PerfectScrollbar from 'perfect-scrollbar';
import { ErrorBoundary } from 'react-error-boundary'
import background from './assets/img/default-bg.jpg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

const Wrapper = styled.div`
  position: relative;
  top: 0;
  height: 100vh;
`
const MainPanel = styled.div`
  border-top: 2px solid #ffb84b;
  max-height: 100% !important;
  width: 100%;
  background-image: url(${background});
  // background-image: url(https://cdn.medal.tv/games/background/background-default.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0px;
  min-width: 100vw;
  min-height: 100vh;
  box-shadow: inset 0 0 0 1000px rgb(255 255 255 /3%);
  // box-shadow: inset 0 0 0 1000px rgb(0 0 0 / 50%);
  // background-color: rgb(0 0 0 / 100%);
  // OLD: This colour is applied over the background image. The image is transparent, meaning there's also a colour behind it in on the body tag. This is located in index.css. Use background-color: rgb(0 0 0 / 100%) here to mimic official styling.
  // UPDATE: There's a new background for Medal. I've commented out the previous code due to the switch.
`
const ErrorMainPanel = styled(MainPanel)`
  // box-shadow: inset 0 0 0 1000px rgb(0 0 0 / 50%);
  box-shadow: inset 0 0 0 1000px rgb(255 255 255 / 0%);
`
const GridContainer = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-columns: 1.5fr 1.5fr 1.5fr;
  grid-template-rows: auto auto auto;
  min-height: calc(100vh - 7.5rem);

  @media screen and (max-width: 1920px){
    grid-template-columns: 1fr 1.5fr 1fr;
  }

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
  grid-row-start: 2;
`
const ErrorEmoji = styled.div`
  display: flex;
  font-size: 8rem;
  justify-items: center;
  justify-content: center;
  align-content: center;
  -webkit-animation: bounce 2.2s infinite linear;
  animation: bounce 2.2s infinite linear;
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
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
`
const ProgressContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 6px;
  background: #e1e4e8;
  border-radius: 3px;
  overflow: hidden;
`
const ProgressBar = styled.span`
  display: block;
  height: 100%;
  background: linear-gradient(90deg,#ffb84b,#ffb84b 17%,#ffb84b 34%,#ffb84b 51%,#ffb84b 68%,#ff8a17 85%,#ffb84b);
  background-size: 300% 100%;
  width: 0;
  animation: progress-animation 10s ease-in-out;
`

function ErrorFallback() {
  useEffect(() => {
    setTimeout(function(){
      window.location.reload();
    }, 5000);
  });

  return (
    <Wrapper>
      <ErrorMainPanel>
        <ErrorGridContainer>
          <ErrorContent>
            <ErrorEmoji>💩</ErrorEmoji>
            <ErrorHeading>Uh oh...</ErrorHeading>
            <ErrorMessage>
              Something broke. We'll reload the page so you can try again!
            </ErrorMessage>
            <ProgressContainer>
              <ProgressBar></ProgressBar>
            </ProgressContainer>
          </ErrorContent>
        </ErrorGridContainer>
      </ErrorMainPanel>
    </Wrapper>
  );
}

function App() {
  const mainPanelRef = useRef(null);
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
       new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      })
    }
  })

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <Wrapper>
          <MainPanel ref={mainPanelRef}>
            <GridContainer>
              <Content>
                <Switch>
                  <Route path="/help">
                    <Help/>
                  </Route>
                  <Route path="/" exact>
                    <Grabber/>
                  </Route>
                </Switch>
              </Content>
            </GridContainer>
            <Footer/>
          </MainPanel>
        </Wrapper>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
