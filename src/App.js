import styled from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary.js';

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
  box-sizing: border-box;
  max-width: 100%;
  min-width: 0px;
  min-height: 0px;
  flex-direction: column;
`

const Content = styled.div`
  display: grid;
  box-sizing: border-box;
  align-content: flex-start;
  grid-template-areas:
      ". header header ."
      ". main aside ."
      ". footer footer .";
  grid-template-columns: auto 736px 400px auto;
  grid-template-rows: auto auto auto;
`


function App() {
  return (
    <ErrorBoundary>
      <Wrapper>
        <Container>
          <Content>
            Test
          </Content>
        </Container>
      </Wrapper>
    </ErrorBoundary>
  );
}

export default App;
