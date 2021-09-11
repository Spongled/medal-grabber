import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const BtnMedal = styled.button`
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  position: relative;
  background: #eb4d55;
  border: none;
  color: rgb(19, 19, 29);
  transition: all 0.3s ease-in-out;

  :hover {
    background: #f0757b;
    transform: translateY(-2px);
  }
`


const BtnClear = ({clearID}) => {
    return (
        <>
          <BtnMedal onClick={clearID} title="Clear ID"><FontAwesomeIcon icon={faTimes}/></BtnMedal>
        </>
    )
}

BtnMedal.propTypes = {
  onClick: PropTypes.func
}

export default BtnClear
