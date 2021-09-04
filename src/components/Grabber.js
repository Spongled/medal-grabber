import { useState, useEffect } from 'react'
import ClipPlayer from './ClipPlayer.js'
import BtnRefresh from './BtnRefresh.js'
import Loader from './Loader.js'

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
        <fieldset>
          <p>Choose clip amount:</p>
          <select onChange={e => setClipAmount(e.target.value)} type="select" name="select" id="inputID">
            <option value="" defaultValue hidden>How many clips?</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
        </select>
        </fieldset>
        <fieldset>
          <p>Enter user ID (or leave it blank for recent clips from random users!):</p>
          <input id="userID" type="text" name="text"/>
        </fieldset>
        <BtnRefresh btnText={loading ? 'Grab from ID' : 'Grabbing 😎 '} refreshClicked={() => getInputFromDOM()}/>
      { loading 
        ? null
        : <Loader/>
      }
      {clipPlayers}
    </>
  );
}

export default Grabber;
