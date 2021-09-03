import styled from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary.js';

const Wrapper = styled.div`
  position: fixed;
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(#1e1e2f, #1e1e24);
  background-image: url(https://cdn.medal.tv/games/background/background-default.png);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0px;
  left: 0px;
  box-shadow: inset 0 0 0 1000px rgb(0 0 0 / 50%) //This colour is applied over the background image. The image is transparent, meaning there's also a colour behind it in on the body tag. This is located in index.css;
`

const Container = styled.div`
  position: relative;

`

function App() {
  return (
    <ErrorBoundary>
      <Wrapper>
        <Container>
          Text
        </Container>
      </Wrapper>
    </ErrorBoundary>
  );
}

export default App;
