import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const BtnMedal = styled.button`
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  position: relative;
  background: rgb(255, 184, 75);
  border: none;
  color: rgb(19, 19, 29);
  transition: all 0.3s ease-in-out;

  :hover {
    background: #01d28e;
    transform: translateY(-2px);
  }
`


const BtnSet = ({setID}) => {
    return (
        <>
          <BtnMedal onClick={setID} title="Set ID"><FontAwesomeIcon icon={faPlus}/></BtnMedal>
        </>
    )
}

BtnMedal.propTypes = {
  onClick: PropTypes.func
}

export default BtnSet
