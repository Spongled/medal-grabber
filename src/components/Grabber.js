import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ClipPlayer from './ClipPlayer.js'
import BtnSet from './BtnSet.js'
import BtnClear from './BtnClear.js'

const InputSelect = styled.select`
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
const InputOption = styled.option`
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.8);
`
const InputUserID = styled.input`
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  width: 87%;
  height: 26px;
  border-radius: 0.4285rem;
  border: 2px solid ${props => props.borderColor};
  padding: 0.5rem 0.7rem;
  color: rgba(255, 255, 255, 0.8);
  background-color: transparent;
  background-clip: padding-box;
  transition: all 0.3s ease-in-out;

  :focus-visible {
    border-color: ${props => props.focusBorderColor};
    outline: 0;
  }

  @media screen and (max-width: 2050px){
    width: 85%;
  }

  @media screen and (max-width: 1795px){
    width: 82%;
  }

  @media screen and (max-width: 1500px){
    width: 85%;
  }

  @media screen and (max-width: 768px){
    width: 78%;
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
const Instruction = styled.div`
  font-size: 0.75rem;
  color: rgb(179, 177, 182);
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`

// Add a dismissable box with brief description. Maybe dull the background and focus the box until "Got it!" is clicked by the user?
// Animate border-top during grab? Could either 0-100% or gradient
// Ask Josh if he can enable rawFileUrls on my API key
// Add download functionality
// Tick multiple clips to download at once
// Optimise renders
// Look into useCallback
// Format view and like numbers? e.g. 1,000 not 1000
// Add scrolltop button
// Need logic to display "no clips found!" if searching for a game that the user doesn't play
// Need logic to display "no more clips"! if trying to access an amount larger than available
// Add ? next to "user ID" instruction which displays gif of where to find user ID on hover
// Display game name and cover photo on clip container
// Add credits page
// Add footer
// Create readme.md
// Add a toggle between classic and new styling?
// Convert to Redux
// Custom prompt breaks if input is null

function Grabber () {
  const [clipArray, setClipArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [clipAmount, setClipAmount] = useState(0)
  const [userID, setUserID] = useState()
  const [inputID, setInputID] = useState()
  const [inputPlaceholder, setInputPlaceholder] = useState("e.g. 261997")
  const [categoryID, setCategoryID] = useState(null)
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

  // Runs on load and re-render.
  useEffect(() => {
    setLoading(false)
    const getClip = async () => {
      const data = await fetchClips()
      setClipArray(data)
      setLoading(true)
    }
    getClip()
  }, [clipAmount, userID, categoryID])

  // Fetch clip.
  const fetchClips = async () => {
    const URL = 'https://developers.medal.tv/v1/latest?categoryId=' + categoryID + '&userId=' + userID + '&limit=' + clipAmount + '&autoplay=0&muted=0&cta=0'
    const res = await fetch(URL, options)
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
    const categoryID = clipArray.contentObjects[i].categoryId

    clipPlayers.push(
    <ClipPlayer
      clipFrame={clipArray.contentObjects[i].embedIframeCode}
      clipTitle={clipArray.contentObjects[i].contentTitle}
      clipViews={clipArray.contentObjects[i].contentViews}
      clipLikes={clipArray.contentObjects[i].contentLikes}
      clipLink={clipArray.contentObjects[i].directClipUrl}
      clipLength={clipArray.contentObjects[i].videoLengthSeconds}
      clipGame="testName"
      key={i}/>
    )
    console.log("Success")
  })

  // Use constantly tracked inputID (which is the value of <InputUserID> at any given moment) from controlled component and re-trigger clip grab in useEffect by updating userID dependency using setUserID setter.
  function updateUserID() {
    const userID = inputID
    setUserID(userID)
    setInputID("") // Clear the value so we can see the placeholder beneath, and so that a new value can be input next time.
    setInputPlaceholder("ID: " + userID + " active!")
  }

  // Constantly tracks the input of the <InputUserID> component. Updates the inputID var using the setInputID setter on each keystroke (onChange). This is a controlled component.
  function updateInputID(e) {
    setInputID(e)
  }

  function clearInput() {
    setUserID(null)
    setInputPlaceholder("e.g. 261997")
  }

  // We can capture the Enter key from <InputUserID> as a shortcut instead of the user having to press BtnSet. Add validation so that a user cannot Enter while BtnSet is still disabled.
  function handleKeypress(e) {
    if (e.key === 'Enter' && inputID > 9999) {
      updateUserID()
    }
  }

  function categoryMatcher(e) {
    const gameName = e
    if (gameName === "None") {
      setCategoryID(null)
    }
    if (gameName === "Custom") {
      var customGameName = prompt("Enter the name of the game you want to grab. Please format the name properly:")
      if (customGameName == null) {
        customGameName = "Invalid"
      }
      const formattedCustomGameName = customGameName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
      // ^ matches the beginning of the string.
      // \w matches any word character.
      // {1} takes only the first character.
      // ^\w{1} matches the first letter of the word.
      // | works like the boolean OR. It matches the expression after and before the |.
      // \s+ matches any amount of whitespace between the words (for example spaces, tabs, or line breaks).
      // Together, this formats the user-input custom game name to have a capital letter at the beginning of each word, aligning to the naming convention of the API. E.G. "apex legends" -> "Apex Legends".
      // This isn't foolproof though. Trickier names like "league of Legends" and "RuneScape" won't work here.
      categoryMatcher(formattedCustomGameName)
    } else {
      if (sessionStorage.getItem('sessionJSON') === null) {
        createStorage()
        updateCategory(gameName)     
      }
      else {
        updateCategory(gameName)
      }
    }
  }

  const createStorage = async () => {
    const res = await fetch('https://api-v2.medal.tv/categories/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = await res.json()
    const categoryString = JSON.stringify(data)
    sessionStorage.setItem('sessionJSON', categoryString)
  }


  function updateCategory(gameName) {
    // Convert JSON string back to JSON object.
    const categoryString = sessionStorage.getItem('sessionJSON')
    const categoryObj = JSON.parse(categoryString)
    var gameArray = []
    document.querySelector("#inputGameName").selectedIndex = 1
    document.querySelector("#customOption").innerHTML = gameName
    gameArray = categoryObj.filter(e => e.categoryName === gameName)
    if (gameArray.length === 0) {
      // Use this to check for an alternative game name if nothing was found initially, replace the gameArray if found.
      gameArray = categoryObj.filter(e => e.alternativeName === gameName)
    }
    if (gameArray.length === 0 && gameName === "Latest clips / all games!") {
      setCategoryID(null)
    } else {
      if (gameArray.length === 0 && gameName !== "Latest clips / all games!") {
        document.querySelector("#inputGameName").selectedIndex = 2
      } else {
        const gameID = gameArray[0].categoryId
        setCategoryID(gameID)
      }
    }
  }

  return (
      <>
        <Instruction>Choose clip amount:</Instruction>
        <InputSelect onChange={e => setClipAmount(e.target.value)} type="select">
          <option value="" defaultValue hidden>How many clips?</option>
          <InputOption>1</InputOption>
          <InputOption>2</InputOption>
          <InputOption>3</InputOption>
          <InputOption>4</InputOption>
          <InputOption>5</InputOption>
          <InputOption>6</InputOption>
          <InputOption>7</InputOption>
          <InputOption>8</InputOption>
          <InputOption>9</InputOption>
          <InputOption>10</InputOption>
          <InputOption>15</InputOption>
          <InputOption>20</InputOption>
        </InputSelect>
        <Instruction>Choose game:</Instruction>
        <InputSelect onChange={e => categoryMatcher(e.target.value)} type="text" id="inputGameName">
          <InputOption defaultValue>Latest clips / all games!</InputOption>
          <InputOption value="customOption" hidden id="customOption"></InputOption> {/* Used as a dummy which can be named as any valid game that isn't initally in the list. */}
          <InputOption value="invalidOption" hidden id="invalidOption">Invalid game name! Please try again.</InputOption>
          <InputOption>Valorant</InputOption>
          <InputOption>Fortnite</InputOption>
          <InputOption>GTA V</InputOption>
          <InputOption>Roblox</InputOption>
          <InputOption>Minecraft</InputOption>
          <InputOption>Rocket League</InputOption>
          <InputOption>Counter Strike: Global Offensive</InputOption>
          <InputOption>Apex Legends</InputOption>
          <InputOption>Overwatch</InputOption>
          <InputOption>League of Legends</InputOption>
          <InputOption>Call of Duty Warzone</InputOption>
          <InputOption>Call of Duty®: Black Ops Cold War</InputOption>
          <InputOption>Call of Duty: Mobile</InputOption>
          <InputOption>Among Us</InputOption>
          <InputOption>Rust</InputOption>
          <InputOption>Tom Clancy's Rainbow Six Siege</InputOption>
          <InputOption>Halo Infinite</InputOption>
          <InputOption>Halo: The Master Chief Collection</InputOption>
          <InputOption>Old School RuneScape</InputOption>
          <InputOption>RuneScape</InputOption>
          <InputOption>World of Warcraft Classic</InputOption>
          <InputOption>World of Warcraft</InputOption>
          <InputOption>New World</InputOption>
          <InputOption>Destiny 2</InputOption>
          <InputOption>Escape From Tarkov</InputOption>
          <InputOption>Dead By Daylight</InputOption>
          <InputOption>osu!</InputOption>
          <InputOption>Garry's Mod</InputOption>
          <InputOption>PUBG</InputOption>
          <InputOption>Aim Lab</InputOption>
          <InputOption>Battlefield V</InputOption>
          <InputOption>Warframe</InputOption>
          <InputOption>Sea of Thieves</InputOption>
          <InputOption>Red Dead Redemption 2</InputOption>
          <InputOption>Hearthstone</InputOption>
          <InputOption>Terraria</InputOption>
          <InputOption>Binding of Isaac</InputOption>
          <InputOption>No Man's Sky</InputOption>
          <InputOption>Fall Guys</InputOption>
          <InputOption>Valheim</InputOption>
          <InputOption>Skyrim</InputOption>
          <InputOption>Spellbreak</InputOption>
          <InputOption>Hyper Scape</InputOption>
          <InputOption>Custom</InputOption>
        </InputSelect>
        <Instruction>Optional - add user ID:</Instruction>
        <FlexContainer>
          { userID
            ? <InputUserID disabled borderColor={userID ? "#01d28e" : "#5F5F66"} focusBorderColor={userID ? "#01d28e" : "rgb(255,184,75)"} type="number" placeholder={inputPlaceholder} value={inputID} onChange={(e) => updateInputID(e.currentTarget.value)}/>
            : <InputUserID onKeyPress={handleKeypress} borderColor={userID ? "#01d28e" : "#5F5F66"} focusBorderColor={userID ? "#01d28e" : "rgb(255,184,75)"} type="number" placeholder={inputPlaceholder} value={inputID} onChange={(e) => updateInputID(e.currentTarget.value)}/>
          }
          { userID
            ? <BtnClear clearID={() => clearInput()}/>
            : <BtnSet inputID={inputID} setID={() => updateUserID()}/>
          }
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
