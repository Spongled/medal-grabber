import React, {useEffect} from 'react';
import styled from 'styled-components'

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
  // background-color: rgb(0 0 0 / 100%);
  // This colour is applied over the background image. The image is transparent, meaning there's also a colour behind it in on the body tag. This is located in index.css. Use background-color: rgb(0 0 0 / 100%) to mimic official styling.
`
const ErrorGridContainer = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  grid-template-columns: 1.5fr 1.5fr 1.5fr;
  grid-template-rows: auto 20rem auto;
  // justify-items: center;
  // justify-content: center;
  // align-content: center;

  @media screen and (max-width: 1500px){
    grid-template-columns: 0.5fr 4fr 0.5fr;
  }
`
const ErrorContent = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 3;
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

function refreshPage() {
  window.location.reload(false);
  console.log("onLoad func")
}

setTimeout(function(){
  window.location.reload(1);
}, 5000);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper onContextMenu={refreshPage}>
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
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
