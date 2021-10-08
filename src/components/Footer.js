
import styled from 'styled-components'
import githubIcon from '../assets/img/github.svg'
import medalIcon from '../assets/img/medal-white.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

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
  font-weight: 700;
`
const ExternalLink = styled.a`
  color: #5F5F66;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: #ffb84b;
  }
`
const StyledLink  = styled(Link)`
  color: #5F5F66;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: #ffb84b;
  }
`
const Icon = styled.img`
  display: flex;
  align-content: center;
  width: 18px;
  padding-left: 1rem;
`

const Footer = () => {
  const pathname = useSelector(state => state.pathnameReducer)

  return (
    <FooterContainer>
      <NavContainer>
        <FlexContainer>
          {pathname === '/help'
            ? <StyledLink to="/">
                <FontAwesomeIcon size="lg" icon={faLongArrowAltLeft} title="Home"/>
              </StyledLink>
            : <StyledLink to="/help">
                <FontAwesomeIcon size="lg" icon={faQuestion} title="Help"/>
              </StyledLink>
          }        
        </FlexContainer>
      </NavContainer>
      <FlexContainer>
        <NavContainer>
          <ExternalLink href="https://github.com/Spongled/medal-grabber" target="blank_" title="GitHub"><Icon src={githubIcon}></Icon></ExternalLink>
        </NavContainer>
        <NavContainer>
          <ExternalLink href="https://medal.tv/jimmeh" target="blank_" title="Medal"><Icon src={medalIcon}></Icon></ExternalLink>
        </NavContainer>
      </FlexContainer>
    </FooterContainer>
  )
}

export default Footer
