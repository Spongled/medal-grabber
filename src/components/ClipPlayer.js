const ClipPlayer = ({ Clip, ClipTitle }) => {
    return (
      <>
        <div>{ClipTitle}</div>
        <div className="text-center video-wrapper">
          <div dangerouslySetInnerHTML={{ __html: Clip}}></div>
        </div>
        
      </>
    )
}

export default ClipPlayer
