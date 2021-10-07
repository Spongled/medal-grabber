import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import styled from 'styled-components'
import ClipPlayer from './ClipPlayer.js'
import BtnSet from './BtnSet.js'
import BtnClear from './BtnClear.js'
import API_KEY from '../API_KEY.js'
import medalLogo from '../assets/img/medal.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faCog } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'react-collapse'
import { useSelector, useDispatch } from 'react-redux'
import { storeClipObjectsJSON } from '../actions/index.js'
import Help from './Help.js'

const HeaderContainer = styled.div`
  display: flex;
  margin-top: 5rem;
  justify-content: center;

  @media screen and (max-width: 768px){
    margin-top: 2.5rem;
  }
`
const MedalLogo = styled.img`
  vertical-align: middle;
  width: 70px;
  margin-right: 15px;

  @media screen and (max-width: 768px){
    width: 50px;
  }
`
const GrabberTitle = styled.header`
  vertical-align: middle;
  font-size: 2.5rem;
  letter-spacing: 8px;
  color: #fff;

  @media screen and (max-width: 768px){
    font-size: 1.8rem;
  }
`
const OptionsContainer = styled.div`
  // background: rgba(29, 31, 40, 0.75); // Brand styling.
  background: rgba(29, 31, 40, 0.45);
  padding: 5px 20px;
  border-radius: 11px;
  max-width: 600px;
  margin: auto;
`
const InputSelect = styled.select`
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  border-radius: 0.4285rem;
  border: 1px solid #5F5F66;
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
  width: 100%;
  height: 18px;
  border-radius: 0.4285rem;
  border: 1px solid ${props => props.borderColor};
  padding: 0.5rem 0.7rem;
  color: rgba(255, 255, 255, 0.8);
  background-color: transparent;
  background-clip: padding-box;
  transition: all 0.3s ease-in-out;

  :focus-visible {
    border-color: ${props => props.focusBorderColor};
    outline: 0;
  }

  :disabled {
    cursor: not-allowed;
  }
`
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`
const FlexContainerCentered = styled(FlexContainer)`
  justify-content: center;
`
const FlexButtonContainer = styled(FlexContainer)`
  display: flex;
  align-items: center;
  justify-items: center;
  margin-bottom: 0;
  margin-left: 1rem;
`
const FlexTitleAndLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const FlexToggleParent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-content: center;
  align-items: center;
  color: #5F5F66;
  margin-top: 1rem;
  margin-bottom: 1rem;
`
const FlexToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-content: center;
  align-items: center;
  color: #5F5F66;
  transform: ${props => props.rotation};
  transition: all 0.15s ease-in-out;

  :hover {
    transform: transform:rotate(0deg);
    color: rgb(255, 255, 255, 0.8);
    cursor: pointer;
    // transform: rotate(0deg);
  }
`
const Loader = styled.div`
  display: flex;
  margin-left: 1rem;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  border-top: 0.2rem solid rgba(255, 255, 255, 0.2);
  border-right: 0.2rem solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.2rem solid rgba(255, 255, 255, 0.2);
  border-left: 0.2rem solid #ffffff;
  animation: load8 1.1s infinite linear;

  :after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
}
`
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #5F5F66;
  background: #1f1f1f;
  border-radius: 100px;
  padding: 4px 12px;
  color: #ffb84b;
  transition: all 0.15s ease-in-out;

  :hover {
    background: rgb(36, 38, 45);
  }

  svg {
    padding-right: 5px;
  }
`
const Instruction = styled.div`
  font-size: 0.75rem;
  color: rgb(179, 177, 182);
  margin-bottom: 0.5rem;
`

// Convert to Redux
// Look more into useCallback
// Add a tutorial page: displays gif of where to find user ID, etc.
// Update readme.md
// Fix scrolling on mobile
// Add debug option in ? to throw error
// Add clipObjects data in error boundary?

function Grabber () {
  const [_, setClipObjects] = useState([])
  const [clipPlayers, setClipPlayers] = useState ([])
  const [loading, setLoading] = useState(false)
  const [clipAmount, setClipAmount] = useState(0)
  const [userID, setUserID] = useState()
  const [inputID, setInputID] = useState()
  const [inputPlaceholder, setInputPlaceholder] = useState("e.g. 261997")
  const [categoryID, setCategoryID] = useState(null)
  const [toggle, setToggle] = useState(true)
  const [allCategoriesObj, setAllCategoriesObj] = useState(null)
  const dispatch = useDispatch()
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

  // Used to trigger react-error-boundary for async promise rejections.
  const useAsyncError = () => {
    const [_, setError] = useState()
    return useCallback(
      error => {
        setError(() => {
          throw error
        })
      },
      [setError],
    )
  }
  const throwError = useAsyncError()

  // Run on each render.
  useEffect(() => {
    console.log("<------------------------------------------------------------]")
    console.log("START useEffect")
    setLoading(false)
    // After error message is displayed, reset the clip amount to whatever it was before if a valid selection is made.
    if (document.querySelector("#inputClipAmount").selectedIndex === 1) {
      document.querySelector("#inputClipAmount").value = clipAmount
    }
    getClip()
    console.log("END useEffect")
    console.log("[------------------------------------------------------------>")
  }, [clipAmount, userID, categoryID])

  const getClip = async () => {
    try {
      console.log("<------------------------------------------------------------]")
      console.log("START getClip")
      if (allCategoriesObj === null) {
        fetchJSON() 
      }
      const clipObjects = await fetchClips()
      console.log("All clip objects:")
      console.log(clipObjects)
      const clipObjectsJSON = JSON.stringify(clipObjects)
      setClipObjects(clipObjects)
      dispatch(storeClipObjectsJSON(clipObjectsJSON))
      setLoading(true)
      const clipPlayers = await createClipPlayers(clipObjects)
      console.log("All clip players:")
      console.log(clipPlayers)
      setClipPlayers(clipPlayers)
      console.log("END getClip")
      console.log("[------------------------------------------------------------>")
    } catch {
        throwError(new Error("Asynchronous error"))
      }
  }

  // Fetch clip data from the Medal API using given parameters.
  // Pass the objects back to getClip() and assign them to the clipObjects variable using the setClipObjects setter.
  const fetchClips = async () => {
    console.log("<------------------------------------------------------------]")
    console.log("START fetchClips")
    const URL = 'https://developers.medal.tv/v1/latest?categoryId=' + categoryID + '&userId=' + userID + '&limit=' + clipAmount + '&autoplay=0&muted=0&cta=0'
    const res = await fetch(URL, options)
    const data = await res.json()
    const retrievedClipObjects = []
    for (var i = 0; i < clipAmount; i++) {
      console.log("Pushing JS object of retrieved clip to clipArray of index: " + i)
      retrievedClipObjects.push(data)
      console.log(retrievedClipObjects[i])
      console.log("Pushed JS object: " + i)
      console.log("END fetchClips")
      console.log("[------------------------------------------------------------>")
    }
    return retrievedClipObjects
  }
  
  // Create array of ClipPlayer components + props using incremental loop.
  // Return this array of objects back to getClip() and assign to the clipPlayers variable using the setClipPlayers setter.
  const createClipPlayers = async (clipObjects) => {
    console.log("<------------------------------------------------------------]")
    console.log("START createClipPlayers")
    var tempClipPlayersArray = []
    try {
      clipObjects.forEach((clipObjects, i)=>{
        const categoryID = clipObjects.contentObjects[i].categoryId
        const gameNameAndImage = findGameByCategoryID(categoryID)
        console.log("Obtaining object data of retrieved clip and pushing to clipPlayers array of index: " + i)
        tempClipPlayersArray.push(
        <ClipPlayer
          clipFrame={clipObjects.contentObjects[i].embedIframeCode}
          clipTitle={clipObjects.contentObjects[i].contentTitle}
          clipViews={clipObjects.contentObjects[i].contentViews}
          clipLikes={clipObjects.contentObjects[i].contentLikes}
          clipLink={clipObjects.contentObjects[i].directClipUrl}
          clipDownload={clipObjects.contentObjects[i].rawFileUrl}
          clipLength={clipObjects.contentObjects[i].videoLengthSeconds}
          clipGame={gameNameAndImage[0]}
          clipImage={gameNameAndImage[1]}
          key={i}/>
        )
        console.log(tempClipPlayersArray[i])
      })
    } catch {
      document.querySelector("#inputClipAmount").selectedIndex = 1
      // If clipObjects is null for some reason, catch the error and display the error message <InputSelect>
    }
    
    console.log("END createClipPlayers")
    console.log("[------------------------------------------------------------>")
    return tempClipPlayersArray
  }

  // Pulls the whole entry via category ID from the JSON array and extracts the categoryName and categoryBackground value.
  // This is then passed back to createClipPlayers() so that it can be assigned to a prop.
  function findGameByCategoryID(categoryID) {
    console.log("<------------------------------------------------------------]")
    console.log("START findGameByCategoryID")
    console.log("categoryID being filtered: " + categoryID)
    var tempSingleCategoryObjArray = []
    tempSingleCategoryObjArray = allCategoriesObj.filter(e => e.categoryId === categoryID)
    console.log("Entry matching category ID:")
    console.log(tempSingleCategoryObjArray)
    console.log("Extract categoryName:")
    console.log(tempSingleCategoryObjArray[0].categoryName)
    const gameNameAndImage = [] 
    gameNameAndImage.push(tempSingleCategoryObjArray[0].categoryName, tempSingleCategoryObjArray[0].categoryBackground)
    console.log("END findGameByCategoryID")
    console.log("[------------------------------------------------------------>")
    return gameNameAndImage
  }

  // Use constantly tracked inputID (which is the value of <InputUserID> at any given moment)
  // from controlled component and re-trigger clip grab in useEffect by updating userID dependency using setUserID setter.
  function updateUserID() {
    const userID = inputID
    setUserID(userID)
    setInputID("") // Clear the value so we can see the placeholder beneath, and so that a new value can be input next time.
    setInputPlaceholder("Grabbing from ID: " + userID)
  }

  // Constantly tracks the input of the <InputUserID> component.
  // Updates the inputID var using the setInputID setter on each keystroke (onChange). This is a controlled component.
  function updateInputID(e) {
    setInputID(e)
  }

  // Removes userID from the clip API query and resets the placeholder.
  function clearInput() {
    setUserID(null)
    setInputPlaceholder("e.g. 261997")
  }

  // We can capture the Enter key from <InputUserID> as a shortcut instead of the user having to press BtnSet.
  // Add validation so that a user cannot Enter while BtnSet is still disabled.
  function handleKeypress(e) {
    if (e.key === 'Enter' && inputID > 9999) {
      updateUserID()
    }
  }

  // Takes the input from "Choose game" whether it be custom or predefined, formats it if required,
  // and sends through to the updateCategoryByGameName() function.
  function gameMatcher(e) {
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
      // ^ matches the beginning of the string, \w matches any word character, {1} takes only the first character, ^\w{1} 
      // matches the first letter of the word.
      // | works like the boolean OR. It matches the expression after and before the |, \s+ matches any amount of 
      // whitespace between the words (for example spaces, tabs, or line breaks).
      // Together, this formats the custom game name which has been entered by the user to have a capital letter at the beginning of each word,
      // aligning to the naming convention of the API. E.G. "apex legends" -> "Apex Legends".
      // This isn't foolproof though. Trickier names like "League of Legends" and "RuneScape" won't work here.
      gameMatcher(formattedCustomGameName)
    } else {
      updateCategoryByGameName(gameName)
    }
  }

  // Retrieves the entire JS object for categories from the Medal API and sets it to the allCategoriesObj variable using the setter.
  const fetchJSON = async () => {
    console.log("Pulling all category JSON and assigning to allCategoriesObj")
    const res = await fetch('https://api-v2.medal.tv/categories/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = await res.json()
    setAllCategoriesObj(data)
  }

  // Takes the gameName from the gameMatcher() function and filters through until a matching entry is found using the gameName.
  function updateCategoryByGameName(gameName) {
    var tempCategoryArray = []
    document.querySelector("#inputGameName").selectedIndex = 1
    document.querySelector("#customOption").innerHTML = gameName
    tempCategoryArray = allCategoriesObj.filter(e => e.categoryName === gameName)
    if (tempCategoryArray.length === 0) {
    // Use this to check for an alternative game name if nothing was found initially, replace the tempCategoryArray if found.
      tempCategoryArray = allCategoriesObj.filter(e => e.alternativeName === gameName)
    }
    // If still nothing was found, assume the selection is "Latest clips / all games!" and reset the categoryID to null so all games can be viewed.
    if (tempCategoryArray.length === 0 && gameName === "Latest clips / all games!") {
      setCategoryID(null)
    } else {
      // If still nothing was found, display the invalidOption input message.
      if (tempCategoryArray.length === 0 && gameName !== "Latest clips / all games!") {
        document.querySelector("#inputGameName").selectedIndex = 2
      } else {
        // If all other edge-cases have been exhausted, rightfully set the categoryID that has been found from the game string 
        // which has either been selected or entered by the user.
        const categoryID = tempCategoryArray[0].categoryId
        setCategoryID(categoryID)
      }
    }
  }

  const reduxTest = useSelector(state => state.clipObjectsReducer)
  
  return (
      <>
        <Router>
          <Route path ='/' exact render={() => {
            <>
            </>
          }}/>
          <FlexContainerCentered>
            <HeaderContainer>
                <MedalLogo src={medalLogo} alt="Medal.tv logo"/>
                <GrabberTitle>GRABBER</GrabberTitle>
                <GrabberTitle>{reduxTest}</GrabberTitle>
              </HeaderContainer>
          </FlexContainerCentered>
          <OptionsContainer>
            <FlexToggleParent>
              <FlexTitleAndLoader onClick={e => setToggle(!toggle)}>
                <Title><FontAwesomeIcon icon={faCog}/>Settings</Title>
                { loading 
                  ? null
                  : <Loader/>
                }
              </FlexTitleAndLoader>
              <FlexToggleContainer onClick={e => setToggle(!toggle)} rotation={toggle ? "rotate(0deg)" : "rotate(180deg)"}>
                <FontAwesomeIcon icon={faChevronUp}/>
              </FlexToggleContainer>
            </FlexToggleParent>
            <Collapse isOpened={toggle} >
              <Instruction>Choose clip amount:</Instruction>
              <InputSelect onChange={e => setClipAmount(e.target.value)} type="select" id="inputClipAmount">
                <InputOption value="" defaultValue hidden>How many clips?</InputOption>
                <InputOption value="" hidden>Oops! This user either doesn't exist or own this number of clips.</InputOption>
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
              <InputSelect onChange={e => gameMatcher(e.target.value)} type="text" id="inputGameName">
                <InputOption defaultValue>Latest clips / all games!</InputOption>
                <InputOption value="" hidden id="customOption"></InputOption> 
                {/*^ Used as a dummy which can be named as any valid game that isn't initally in the list. */}
                <InputOption value="" hidden>Invalid game name! Please try again.</InputOption>
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
                  ? <InputUserID 
                      disabled borderColor={userID ? "#01d28e" : "#5F5F66"}
                      focusBorderColor={userID ? "#01d28e" : "rgb(255,184,75)"}
                      type="number" 
                      placeholder={inputPlaceholder} 
                      value={inputID} onChange={(e) => updateInputID(e.currentTarget.value)}/>
                  : <InputUserID 
                      onKeyPress={handleKeypress}
                      borderColor={userID ? "#01d28e" : "#5F5F66"}
                      focusBorderColor={userID ? "#01d28e" : "rgb(255,184,75)"}
                      type="number"
                      placeholder={inputPlaceholder}
                      value={inputID}
                      onChange={(e) => updateInputID(e.currentTarget.value)}/>
                }
                <FlexButtonContainer>
                { userID
                  ? <BtnClear clearID={() => clearInput()}/>
                  : <BtnSet inputID={inputID} setID={() => updateUserID()}/>
                }
                </FlexButtonContainer>
              </FlexContainer>
            </Collapse>
        </OptionsContainer>
        {clipPlayers}
        <Switch>
          <Route path="/Help">
            <Help />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Grabber
