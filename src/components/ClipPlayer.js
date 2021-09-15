import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudDownloadAlt, faStopwatch } from '@fortawesome/free-solid-svg-icons'
import medalLikes from '../assets/img/likes.svg'
import medalViews from '../assets/img/views.svg'

const VideoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 56.25%; /* 16:9 */
  margin-top: 2rem;
  z-index: 2;
`
const ClipInfoContainer = styled.div`
  // background-color: rgba(29, 31, 40, 0.75); // Brand styling.
  background: rgba(29, 31, 40, 0.45);
  box-sizing: border-box;
  max-width: 100%;
  padding: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 0px;
  margin-bottom: 1rem;
  z-index: 1;
`
const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const NewFlexRow = styled(FlexContainer)`
  margin-bottom: 0.5rem;
`
const ExternalLink = styled.a`
  color: #5F5F66;
  text-decoration: none;
  padding-left: 15px;

  :hover {
    color: rgb(255,184,75);
  }
`
const ExternalLinkTitle = styled(ExternalLink)`
  color: rgb(179, 177, 182);
  padding-left: 0;
`
const ClipTitleContainer = styled.span`
  font-size: 1rem;
`
const InfoBadge = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: rgb(179, 177, 182);
  text-decoration: none;
  font-size: 12px;
  box-sizing: border-box;
  border-radius: 11px;
  max-width: 100%;
  padding: 4px 10px;
  align-items: center;
  background: #24262D;
`
const TransparentBadge = styled(InfoBadge)`
  background: transparent;
  padding: 5px 0;
  margin-right: 0;
`
const GameBadge = styled.div`
  display: flex;
  box-sizing: border-box;
  margin-right: 8px;
  align-items: center;
  background: #24262D;
  flex-direction: row;
  height: 24px;
  padding-top: 6px;
  padding-bottom: 6px;
  border-radius: 11px;
`
const GameImg = styled.img`
  border-radius: 11px 0px 0px 11px;
  height: 24px;
  width: 18px;
`
const GameTitle = styled.span`
  margin-left: 8px;
  margin-right: 8px;
  font-size: 12px;
  line-height: 16px;
  color: rgb(179, 177, 182);
`
const EngagementViews = styled.img`
  width: 18px;
  margin-right: 5px;
`
const EngagementLikes = styled.img`
  width: 18px;
  margin-left: 5px;
  margin-right: 5px;
`


const ClipPlayer = ({clipFrame, clipTitle, clipViews, clipLikes, clipLink, clipLength, clipGame, clipImage}) => {
  const clipLengthSeconds = clipLength

    return (
      <>
        <VideoWrapper>
          <div dangerouslySetInnerHTML={{ __html: clipFrame}}></div>
        </VideoWrapper>
        <ClipInfoContainer>
        <NewFlexRow>
          <FlexContainer>
            <ExternalLinkTitle href={clipLink} target="blank_" title="View clip in new tab">
              <ClipTitleContainer>{clipTitle}</ClipTitleContainer>
            </ExternalLinkTitle>
          </FlexContainer>
          <FlexContainer>
            <ExternalLink href={clipLink} target="blank_" title="Download clip"><FontAwesomeIcon icon={faCloudDownloadAlt}/></ExternalLink>
          </FlexContainer>
        </NewFlexRow>
        <FlexContainer>
          <FlexContainer>
            <GameBadge>
              <GameImg src={clipImage}></GameImg>
              <GameTitle>{clipGame}</GameTitle>
            </GameBadge>
            { clipLengthSeconds > 0
              ? <InfoBadge title="Clip length"><FontAwesomeIcon icon={faStopwatch}/> {clipLength}s</InfoBadge>
              : null
            }
          </FlexContainer>
          <FlexContainer>
            <InfoBadge>
              <EngagementViews src={medalViews}></EngagementViews>{clipViews}
              <EngagementLikes src={medalLikes}></EngagementLikes>{clipLikes}
            </InfoBadge>
          </FlexContainer>
        </FlexContainer>
        </ClipInfoContainer>
      </>
    )
}

export default ClipPlayer
