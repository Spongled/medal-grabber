import styled from 'styled-components'

const VideoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 56.25%; /* 16:9 */
  margin-bottom: 2rem;
`

const ClipPlayer = ({Clip, ClipTitle}) => {
    return (
      <>
        <div>{ClipTitle}</div>
        <VideoWrapper>
          <div dangerouslySetInnerHTML={{ __html: Clip}}></div>
        </VideoWrapper>
        
      </>
    )
}

export default ClipPlayer
