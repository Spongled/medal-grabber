import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

const BtnMedal = styled.button`
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 0.4285rem;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  position: relative;
  background: rgb(255, 184, 75);
  border: none;
  height: 40px;
  width: 100%;
  padding: 8px 24px;
  color: rgb(19, 19, 29);
`

const BtnRefresh = ({btnText, refreshClicked}) => {
    return (
        <>
          <div>
            <p className="lead text-center">
              <BtnMedal onClick={refreshClicked}><FontAwesomeIcon icon={faSyncAlt}/> {btnText}</BtnMedal>
            </p>
          </div>
        </>
    )
}

BtnMedal.propTypes = {
  onClick: PropTypes.func
}

export default BtnRefresh
