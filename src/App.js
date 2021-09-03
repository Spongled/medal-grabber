
import styled from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary.js';
import medalLogo from "./assets/img/medal.svg"

const Wrapper = styled.div`
  position: fixed;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(https://cdn.medal.tv/games/background/background-default.png);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0px;
  left: 0px;
  box-shadow: inset 0 0 0 1000px rgb(0 0 0 / 50%); // This colour is applied over the background image. The image is transparent, meaning there's also a colour behind it in on the body tag. This is located in index.css
`

const Container = styled.div`
  position: relative;
  border-top: 2px solid #ffb84b;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-width: 0px;
  min-height: 0px;
`

const Content = styled.div`
  color: #fff;
  display: grid;
  box-sizing: border-box;
  align-content: flex-start;
  justify-content: center;
`

const FlexBox = styled.div`
  display: flex;
  box-sizing: border-box;
  max-width: 100%;
  grid-area: main;
  margin: 0px;
  min-width: 0px;
  min-height: 0px;
  flex-direction: column;
  height: 100%;
`

const TitleContainer = styled.div`
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
          <TitleContainer>
            <MedalLogo src={medalLogo} alt="Medal.tv Logo"/>
            <MedalHeader>GRABBER</MedalHeader>
          </TitleContainer>
        </Container>
      </Wrapper>
    </ErrorBoundary>
  );
}

export default App;
