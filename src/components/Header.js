import styled from 'styled-components'
import medalLogo from '../assets/img/medal.svg'

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
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`
const FlexContainerCentered = styled(FlexContainer)`
  justify-content: center;
`

const Header = () => {
  return (
    <>
    <FlexContainerCentered>
      <HeaderContainer>
        <MedalLogo src={medalLogo} alt="Medal.tv logo"/>
        <GrabberTitle>GRABBER</GrabberTitle>
      </HeaderContainer>
    </FlexContainerCentered>   
    </>
  )
}

export default Header
