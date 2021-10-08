import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { storePathname } from '../actions/actionsIndex.js'
import Header from './Header.js'
import tutorialGIF from '../assets/img/user-id-tutorial.gif'
import medalbot from '../assets/img/medalbot-alt.png'

const HelpContainer = styled.div`
  // background: rgba(29, 31, 40, 0.75); // Brand styling.
  margin: auto;
`
const FlexContainer = styled.div`
  background: rgba(29, 31, 40, 0.45);
  padding: 5px 20px;
  border-radius: 11px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`
const FlexProfileContainer = styled.div`
  padding: 5px 20px;
  border-radius: 11px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-content: center;
  align-items: center;
  flex-direction: column;
`
const FlexAnswer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(29, 31, 40, 0.45);
  padding: 5px 20px;
  border-radius: 11px;
`
const FlexGIFAnswer = styled(FlexAnswer)`
  padding: 5px 20px;
  border-radius: 0;
  border-top-left-radius 11px;
  border-top-right-radius 11px;
`
const FlexQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-content: center;
  align-items: center;
  color: #5F5F66;
  background: #ffb84b;
  padding: 5px 20px;
  border-radius: 11px;
`
const FlexRight = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: row;
  align-content: center;
  align-items: center;
  color: #5F5F66;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 3rem;
  @media screen and (max-width: 850px){
    margin-right: 0;
  }
`
const FlexLeft = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: row;
  align-content: flex-start;
  align-items: flex-start;
  color: #5F5F66;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 3rem;
  @media screen and (max-width: 850px){
    margin-left: 0;
  }
`
const FlexLeftGIF = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: row;
  align-content: flex-start;
  align-items: flex-start;
  color: #5F5F66;
  margin-bottom: 1rem;
`
const MarginAdjust = styled.div`
  margin-top: 0rem;
`
const MarginAdjustAlt = styled.div`
  margin-top: -1rem;
`
const Title = styled.div`
  font-size: 1.5rem;
  color: rgb(179, 177, 182);
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`
const ProfileName = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  color: rgb(179, 177, 182);
  margin-top: 0.5rem;
`
const Question = styled.div`
  font-size: 1rem;
  max-width: 300px;
  color: rgb(19, 19, 29);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`
const Answer = styled.div`
  font-size: 1rem;
  max-width: 300px;
  color: rgb(179, 177, 182);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`
const Medalbot = styled.img`
  border-radius: 50%;
  width: 60px;
  margin-top: 4rem;

  @media screen and (max-width: 768px){
    margin-top: 1rem;
  }
`
const TutorialGIF = styled.img`
  border-bottom-left-radius 11px;
  border-bottom-right-radius 11px;
  max-width: 340px;
`
const ExternalLink = styled.a`
  color: #5F5F66;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  :hover {
    color: rgb(255,184,75);
  }
`
function Help() {
  const dispatch = useDispatch()
  const clipObjectsJSON = useSelector(state => state.clipObjectsJSONReducer)

  useEffect(() => {
    // Update Redux store of current URL for use in dynamic footer.
    const pathname = window.location.pathname
    dispatch(storePathname(pathname))
  })

  function secretDebug(){
    // Writes the clipObjectJSON to a new window for debug purposes.
    var wnd = window.open("about:blank", "", "_blank");
    wnd.document.write(clipObjectsJSON);
  }

  return (
    <>
      <Header/>
      <HelpContainer>
        <FlexProfileContainer onDoubleClick={() => secretDebug()} title="Double click me for debug.">
          <Medalbot src={medalbot}></Medalbot>
          <ProfileName>
            Grabber Support
          </ProfileName>
        </FlexProfileContainer>
        <FlexRight>
          <FlexQuestion>
            <Question>Where do I find my user ID? 😧</Question>
          </FlexQuestion>
        </FlexRight>
        <FlexLeft>
          <MarginAdjust>
            <FlexGIFAnswer>
              <Answer>You can find it in the URL of your Medal profile. See below!</Answer>
            </FlexGIFAnswer>
            <FlexLeftGIF>
              <TutorialGIF src={tutorialGIF}></TutorialGIF>
            </FlexLeftGIF>
          </MarginAdjust>   
        </FlexLeft>
        <FlexRight>
          <MarginAdjustAlt>
            <FlexQuestion>
              <Question>Cool! How do I download clips?</Question>
            </FlexQuestion>
          </MarginAdjustAlt>
        </FlexRight>
        <FlexLeft>
          <MarginAdjust>
            <FlexAnswer>
              <Answer>Click the cloud icon on the right side of the video player! ☁️</Answer>
            </FlexAnswer>
          </MarginAdjust>
        </FlexLeft>
        <FlexRight>
          <MarginAdjustAlt>
            <FlexQuestion>
              <Question>Can I input a game not in your list? 🎮</Question>
            </FlexQuestion>
          </MarginAdjustAlt>
        </FlexRight>
        <FlexLeft>
          <MarginAdjust>
            <FlexAnswer>
              <Answer>Yep. Scroll to the bottom and select 'custom'. This won't work 100% of the time due to games that have irregular titles, but give it a try!</Answer>
            </FlexAnswer>
          </MarginAdjust>
        </FlexLeft>
        <FlexRight>
          <MarginAdjustAlt>
            <FlexQuestion>
              <Question>Thanks for the help! ❤️</Question>
            </FlexQuestion>
          </MarginAdjustAlt>
        </FlexRight>
        <FlexLeft>
          <MarginAdjust>
            <FlexAnswer>
              <Answer>If you need any more help, check out the
                <ExternalLink href="https://github.com/Spongled/medal-grabber" target="blank_" title="GitHub"> GitHub repo</ExternalLink>
                , or send me a message on Discord: @Jimmeh#0001. 😄</Answer>
            </FlexAnswer>
          </MarginAdjust>
        </FlexLeft>
      </HelpContainer>
    </>
  )
}

export default Help
