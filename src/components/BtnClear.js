import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const BtnMedal = styled.button`
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 0.4285rem;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  position: relative;
  background: #01d28e;
  border: none;
  padding: 15px 48px;
  color: rgb(19, 19, 29);
  transition: all 0.3s ease-in-out;

  :hover {
    background: #eb4d55;
    transform: translateY(-2px);
  }

  @media screen and (max-width: 880px){
    padding: 15px 40px;
  }

  @media screen and (max-width: 768px){
    padding: 15px 35px;
  }
`


const BtnClear = ({btnText}) => {
    return (
        <>
          <BtnMedal><FontAwesomeIcon icon={faCheck}/>{btnText}</BtnMedal>
        </>
    )
}

BtnMedal.propTypes = {
  onClick: PropTypes.func
}

export default BtnClear
