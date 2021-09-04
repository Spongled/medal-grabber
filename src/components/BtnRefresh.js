import PropTypes from 'prop-types';
import styled from 'styled-components';

const BtnMedal = styled.button`
  cursor: pointer;
  transition: all 0.2s ease 0s;
  position: relative;
  background: rgb(255, 184, 75);
  border-radius: 2px;
  border: none;
  height: 40px;
  width: 100%;
  padding: 8px 24px;
  color: rgb(19, 19, 29);
  font-weight: 500;
`

const BtnRefresh = ({btnText, refreshClicked}) => {
    return (
        <>
          <div>
            <p className="lead text-center">
              {/* <BtmMedal onClick={refreshClicked} size="lg" className="spin-button text-uppercase mt-4"><i className="tim-icons icon-refresh-02"></i>{btnText}</BtmMedal> */}
            </p>
          </div>
        </>
    )
}

// BtmMedal.propTypes = {
//   onClick: PropTypes.func
// }

export default BtnRefresh
