import styled from 'styled-components';
import medalLogo from './assets/img/medal.svg';
import ErrorBoundary from './components/ErrorBoundary.js';
import Grabber from './components/Grabber.js';

const Wrapper = styled.div`
  position: fixed;
  border-top: 2px solid #ffb84b;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(https://cdn.medal.tv/games/background/background-default.png);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0px;
  left: 0px;
  box-shadow: inset 0 0 0 1000px rgb(0 0 0 / 50%); // This colour is applied over the background image. The image is transparent, meaning there's also a colour behind it in on the body tag. This is located in index.css. Use background-color: rgb(0 0 0 / 100%) to mimic official styling.
`
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // align-content: center;
  max-width: 100%;
  min-width: 0px;
  min-height: 0px;
`
const HeaderContainer = styled(Container)`
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
  return (
    <ErrorBoundary>
      <Wrapper>
        <Container>
          <HeaderContainer>
            <MedalLogo src={medalLogo} alt="Medal.tv Logo"/>
            <MedalHeader>GRABBER</MedalHeader>
          </HeaderContainer>
          <Grabber/>
        </Container>
      </Wrapper>
    </ErrorBoundary>
  );
}

export default App;
