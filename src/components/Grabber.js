import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ClipPlayer from './ClipPlayer.js'
import BtnRefresh from './BtnRefresh.js'

const InputClipSelect = styled.select`
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  height: 48px;
  border-radius: 0.4285rem;
  border: 2px solid #5F5F66;
  width: 100%;
  padding: 0.5rem 0.7rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  background-color: transparent;
  background-clip: padding-box;
  transition: all 0.3s ease-in-out;

  :focus-visible {
    border-color: rgb(255,184,75);
    outline: 0;
  }

  :hover {
    cursor: pointer;
  }
`
const InputClipOption = styled.option`
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.8);
`
const InputUserID = styled.input`
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  width: 65%;
  border-radius: 0.4285rem;
  border: 2px solid #5F5F66;
  padding: 0.5rem 0.7rem;
  color: rgba(255, 255, 255, 0.8);
  background-color: transparent;
  background-clip: padding-box;
  transition: all 0.3s ease-in-out;

  :focus-visible {
    border-color: rgb(255,184,75) !important;
    outline: 0;
  }

  @media screen and (max-width: 880px){
    width: 60%;
  }

  @media screen and (max-width: 768px){
    width: 40%;
  }
`
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`
const Loader = styled.div`
  position: absolute;
  margin-top: 5rem;
  font-size: 5px;
  border-radius: 50%;
  width: 9em;
  height: 9em;
  left: 49%;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;

  :after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  @media only screen and (max-width: 414px) {
    .loader {
      top: 28%;
      left: 45%;
  }
}
`
const Instruction = styled.p`
  font-size: 0.875rem;
  color: rgb(179, 177, 182);
`


// Add a dismissable box with brief description. Maybe dull the background and focus the box until "Got it!" is clicked by the user?

function Grabber () {
  const API_KEY = `pub_MsoICw6lrMKaofb7YjV8Qs9ggYFhWWp5`;
  const options = {
    host: 'https://developers.medal.tv',
    port: 443,
    mode: 'cors',
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': API_KEY
    }
  }

  const [clipArray, setClipArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [clipAmount, setClipAmount] = useState(0)
  const [userID, setUserID] = useState()

  // Runs on load
  useEffect(() => {
    console.log("useEffect")
    setLoading(false)
    const getClip = async () => {
      const data = await fetchClips()
      setClipArray(data)
      setLoading(true)
    }
    getClip()
  }, [clipAmount, userID])

  // Fetch clip
  const fetchClips = async () => {
    const res = await fetch('https://developers.medal.tv/v1/latest?userId=' + userID + '&limit=' + clipAmount + '&autoplay=0&muted=0&cta=0&width=768&height=432', options)
    const data = await res.json()
    console.log(data)
    const clipArray = []
    for (var i = 0; i < clipAmount; i++) {
      console.log("Pushing JSON data of clip to clipArray array - #" + i)
      console.log(clipArray[i])
      clipArray.push(data);
      console.log("Success")
    }
    return clipArray
  }

  // Create array of ClipPlayer components + props using incremental loop.
  const clipPlayers = []
  clipArray.forEach((clipArray, i)=>{
    console.log("Obtaining iFrame for clip and pushing to clipPlayers array - #" + i)
    console.log(clipPlayers[i])
    clipPlayers.push(
    <ClipPlayer
      Clip={clipArray.contentObjects[i].embedIframeCode}
      ClipTitle={clipArray.contentObjects[i].contentTitle}
      ClipViews={clipArray.contentObjects[i].contentViews}
      ClipLikes={clipArray.contentObjects[i].contentLikes}
      ClipLink={clipArray.contentObjects[i].directClipUrl}
      ClipLength={clipArray.contentObjects[i].videoLengthSeconds}
      key={i}/>
    )
    console.log("Success")
  })

  // Pull ID from InputUserID component and use setter to re-render
  function getInputFromDOM() {
    const input = document.querySelector('#InputUserID')
    const userID = input.value
    setUserID(userID)
  }

  // Pressisng enter in user ID input should trigger getInputFromDOM()
  return (
      <>
        <Instruction>Choose clip amount:</Instruction>
        <InputClipSelect onChange={e => setClipAmount(e.target.value)} type="select" id="inputID">
          <option value="" defaultValue hidden>How many clips?</option>
          <InputClipOption>1</InputClipOption>
          <InputClipOption>2</InputClipOption>
          <InputClipOption>3</InputClipOption>
          <InputClipOption>4</InputClipOption>
          <InputClipOption>5</InputClipOption>
          <InputClipOption>6</InputClipOption>
          <InputClipOption>7</InputClipOption>
          <InputClipOption>8</InputClipOption>
          <InputClipOption>9</InputClipOption>
          <InputClipOption>10</InputClipOption>
        </InputClipSelect>
        <Instruction>Enter your user ID and click grab,  or leave blank for random clips:</Instruction>
        <FlexContainer>
          <InputUserID type="number" id="InputUserID" placeholder="e.g. 261997"/>
          <BtnRefresh btnText={loading ? 'Grab from ID' : 'Grabbing 😎 '} refreshClicked={() => getInputFromDOM()}/>
        </FlexContainer>
      { loading 
        ? null
        : <Loader/>
      }
      {clipPlayers}
    </>
  );
}

export default Grabber;
