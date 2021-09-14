import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquareAlt, faStopwatch } from '@fortawesome/free-solid-svg-icons'
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
  background-color: rgba(29, 31, 40, 0.75);
  box-sizing: border-box;
  max-width: 100%;
  padding: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 0px;
  margin-bottom: 1rem;
  z-index: 1;
`
const ClipInfoHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`
const ClipInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const ClipInfoEngagement = styled.div`
  display: flex;
  flex-direction: row;
`
const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
  margin-left: 15px;

  :hover {
    color: rgb(255,184,75);
  }
`
const ClipTitleContainer = styled.span`
  font-size: 1rem;
`
const ExternalLinkTitle = styled(ExternalLink)`
  color: rgb(179, 177, 182);
`
const InfoBadge = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: rgb(179, 177, 182);
  text-decoration: none;
  font-size: 0.8rem;
  box-sizing: border-box;
  border-radius: 10%;
  max-width: 100%;
  padding: 5px 10px;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
`
const GameBadgeContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  max-width: 100%;
  -webkit-box-align: center;
  align-items: center;
  min-width: 0px;
  min-height: 0px;
  flex-flow: row wrap;
  }
`
const GameBadge = styled.div`
  display: flex;
  box-sizing: border-box;
  max-width: 100%;
  margin-bottom: 4px;
  margin-right: 8px;
  -webkit-box-align: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  min-width: 0px;
  min-height: 0px;
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
  color: rgb(255, 255, 255);
`
const EngagementViews = styled.img`
  margin-right: 5px;
`
const EngagementLikes = styled.img`
  height: 80%;
  margin-left: 5px;
  margin-right: 5px;
`
const TitleAndEngagementContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const TimeAndExternalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ClipPlayer = ({clipFrame, clipTitle, clipViews, clipLikes, clipLink, clipLength, clipGame, clipImage}) => {
  const clipLengthSeconds = clipLength;

    return (
      <>
        <VideoWrapper>
          <div dangerouslySetInnerHTML={{ __html: clipFrame}}></div>
        </VideoWrapper>
        <ClipInfoContainer>
          <ClipInfoHeader>
            <GameBadgeContainer>
              <GameBadge>
                <GameImg src={clipImage}></GameImg>
                <GameTitle>{clipGame}</GameTitle>
              </GameBadge>
            </GameBadgeContainer>
          </ClipInfoHeader>
          <ClipInfo>
            <TitleAndEngagementContainer>
              <ClipInfoEngagement>
                <InfoBadge>
                  <EngagementViews src={medalViews}></EngagementViews>{clipViews}
                  <EngagementLikes src={medalLikes}></EngagementLikes>{clipLikes}
                </InfoBadge>
              </ClipInfoEngagement>
              <ExternalLinkTitle href={clipLink} target="blank_" title="View clip in new tab"><ClipTitleContainer>{clipTitle}</ClipTitleContainer></ExternalLinkTitle>
            </TitleAndEngagementContainer>
            <TimeAndExternalContainer>
            { clipLengthSeconds > 0
              ? <InfoBadge title="Clip length"><FontAwesomeIcon icon={faStopwatch}/> {clipLength}s</InfoBadge>
              : null
            }
              <ExternalLink href={clipLink} target="blank_" title="View clip in new tab"><FontAwesomeIcon icon={faExternalLinkSquareAlt}/></ExternalLink>
            </TimeAndExternalContainer>
          </ClipInfo>
        </ClipInfoContainer>
      </>
    )
}

export default ClipPlayer
