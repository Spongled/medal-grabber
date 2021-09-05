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
  justify-content: space-between;
  align-items: center;
`
const ClipInfoEngagement = styled.div`
  display: flex;
  flex-direction: row;
`
const ClipInfoFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
const LengthAndExternalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`


const ClipPlayer = ({Clip, ClipTitle, ClipViews, ClipLikes, ClipLink, ClipLength}) => {
    return (
      <>
        <VideoWrapper>
          <div dangerouslySetInnerHTML={{ __html: Clip}}></div>
        </VideoWrapper>
        <ClipInfoContainer>
          <ClipInfoHeader>
            <TitleAndEngagementContainer>
              <ClipInfoEngagement>
                <InfoBadge>
                  <EngagementViews src={medalViews}></EngagementViews>{ClipViews}
                  <EngagementLikes src={medalLikes}></EngagementLikes>{ClipLikes}
                </InfoBadge>
              </ClipInfoEngagement>
              <ExternalLinkTitle href={ClipLink} target="blank_" title="View clip in new tab"><ClipTitleContainer>{ClipTitle}</ClipTitleContainer></ExternalLinkTitle>
            </TitleAndEngagementContainer>
            <LengthAndExternalContainer>
              <InfoBadge title="Clip length"><FontAwesomeIcon icon={faStopwatch}/> {ClipLength}s</InfoBadge>
              <ExternalLink href={ClipLink} target="blank_" title="View clip in new tab"><FontAwesomeIcon icon={faExternalLinkSquareAlt}/></ExternalLink>
            </LengthAndExternalContainer>
            
          </ClipInfoHeader>
          <ClipInfoFooter>
            
          </ClipInfoFooter>
        </ClipInfoContainer>
      </>
    )
}

export default ClipPlayer
