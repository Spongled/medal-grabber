import styled from 'styled-components'
import githubIcon from '../assets/img/github.svg'
import medalIcon from '../assets/img/medal-white.svg'

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;
`
const FlexContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  align-items: center;
`

const NavContainer = styled.nav`
  font-size: 0.75rem;
  font-weight: 400;
`
const ExternalLink = styled.a`
  color: #ffb84b;
  text-decoration: none;

  :hover {
    color: rgb(255, 232, 92);
  }
`
const Icon = styled.img`
  display: flex;
  align-content: center;
  width: 18px;
  padding-left: 1rem;
`

const Footer = () => {
  return (
    <FooterContainer>
      <NavContainer>
        <ExternalLink href="https://medal.tv" target="blank_">Medal.tv</ExternalLink>
      </NavContainer>
      <FlexContainer>
        <NavContainer>
          <ExternalLink href="https://github.com/Spongled/medal-grabber" target="blank_"><Icon src={githubIcon}></Icon></ExternalLink>
        </NavContainer>
        <NavContainer>
          <ExternalLink href="https://medal.tv/jimmeh" target="blank_"><Icon src={medalIcon}></Icon></ExternalLink>
        </NavContainer>
      </FlexContainer>
    </FooterContainer>
  )
}

export default Footer
