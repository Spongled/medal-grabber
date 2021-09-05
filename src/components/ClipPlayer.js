import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'

const VideoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 56.25%; /* 16:9 */
  margin-top: 2rem;
  z-index: 2;
`
const ClipInfo = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateY(-5px);
  background-color: rgba(29, 31, 40, 0.75);
  box-sizing: border-box;
  max-width: 100%;
  min-width: 0px;
  min-height: 0px;
  padding: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-bottom: 0.5rem;
  z-index: 1;
`
const ClipTitleContainer = styled.div`
  margin-top: 0.1rem;
  font-size: 18px;
`

const ExternalLink = styled.a`
  display: flex;
  justify-content: flex-end;  
  color: rgb(179, 177, 182);
  
  :hover {
    color: rgb(255,184,75);
  }
`

const ClipPlayer = ({Clip, ClipTitle, ClipViews, ClipLikes, ClipLink, ClipLength}) => {
    return (
      <>
        <VideoWrapper>
          <div dangerouslySetInnerHTML={{ __html: Clip}}></div>
        </VideoWrapper>
        <ClipInfo>
          <ClipTitleContainer>{ClipTitle}</ClipTitleContainer>
          <span>{ClipViews}</span>
          <span>{ClipLikes}</span>
          <span>{ClipLength}</span>
          <ExternalLink href={ClipLink} target="blank_" title="View clip in new tab"><FontAwesomeIcon icon={faExternalLinkSquareAlt}/></ExternalLink>
        </ClipInfo>
      </>
    )
}

export default ClipPlayer
