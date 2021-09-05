import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ClipPlayer from './ClipPlayer.js'
import BtnRefresh from './BtnRefresh.js'
import Loader from './Loader.js'

const InputClipSelect = styled.select`
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  border-radius: 0.4285rem;
  border: 1px solid #2b3553;
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
  border-radius: 0.4285rem;
  border: 1px solid #2b3553;
  padding: 0.5rem 0.7rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  background-color: transparent;
  background-clip: padding-box;
  transition: all 0.3s ease-in-out;

  :focus-visible {
    border-color: rgb(255,184,75) !important;
    outline: 0;
  }
`
const FlexContainer = styled.div`
display: flex;
justify-content: flex-end;
`

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

  // Fetch clip
  const fetchClips = async () => {
    const res = await fetch('https://developers.medal.tv/v1/latest?userId=' + userID + '&limit=' + clipAmount + '&autoplay=0&muted=0&cta=0&width=768&height=432', options)
    const data = await res.json()
    const clipArray = []
    for (var i = 0; i < clipAmount; i++) {
      console.log("Pushing JSON data of clip to clipArray array - #" + i)
      console.log(clipArray[i])
      clipArray.push(data);
      console.log("Success")
    }
    return clipArray
  }

  const clipPlayers = []
  clipArray.forEach((clipArray, i)=>{
    console.log("Obtaining iFrame for clip and pushing to clipPlayers array - #" + i)
    console.log(clipPlayers[i])
    clipPlayers.push(<ClipPlayer Clip={ clipArray.contentObjects[i].embedIframeCode } ClipTitle={ clipArray.contentObjects[i].contentTitle } key={i}/>)
    console.log("Success")
  })

  function getInputFromDOM() {
    const input = document.querySelector('#userID')
    const userID = input.value
    setUserID(userID)
  }
  
  useEffect(() => {
    console.log("Rolling the dice!")
    setLoading(false)
    const getClip = async () => {
      const data = await fetchClips()
      setClipArray(data)
      setLoading(true)
    }
    getClip()
  }, [clipAmount, userID])

  return (
      <>
        <p>Choose clip amount:</p>
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
        <p>Enter user ID (or leave it blank for recent clips from random users!):</p>
        <FlexContainer>
          <InputUserID type="number" id="userID"/>
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
