import styled from 'styled-components'
import maxiLogo from '../assets/img/money-maxi-logo.svg'

const HeaderContainer = styled.div`
  display: flex;
  margin-top: 40%;
  justify-content: center;

  @media screen and (max-width: 768px){
    margin-top: 2.5rem;
  }
`
const MaxiLogo = styled.img`
  vertical-align: middle;
  width: 450px;
  -webkit-animation: float 6s ease-in-out infinite;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-20px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  @media screen and (max-width: 768px){
    width: 150px;
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

const FlexContainerNoun = styled(FlexContainer)`
  max-width: 450px;
  margin: auto;
`

const NounTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-top: 4rem;
`

const NounSubtitle = styled.span`
  font-size: 20px;
  font-weight: 400;
  font-style: italic;
  margin-top: 0.5rem;
`

const NounBody = styled.span`
  font-size: 16px;
  font-weight: 325
  color: #ffffff;
`

const Divider = styled.hr`
  max-width: 450px;
  color: #ffffff;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
`

const Hero = () => {
  return (
    <>
    <FlexContainerCentered>
      <HeaderContainer>
        <MaxiLogo src={maxiLogo} alt="Money Maxi Logo"/>
      </HeaderContainer>
    </FlexContainerCentered>  
    <FlexContainerNoun>
      <NounTitle>/ˈmʌni ˈmaksi/</NounTitle>
    </FlexContainerNoun>
    <FlexContainerNoun>
      <NounSubtitle>noun</NounSubtitle>
    </FlexContainerNoun> 
    <Divider></Divider>
    <FlexContainerNoun>
      <NounBody>first of its kind; a unique NFT collection granted to those who are not maxis of any specific blockchain, but maxis of money.</NounBody>
    </FlexContainerNoun> 
    </>
  )
}

export default Hero
