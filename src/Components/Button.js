import PropTypes from 'prop-types'


function Button({ label, bgColor, onClick }) {

  return (
    <button
      className='btn'
      style= {{ backgroundColor: bgColor }}
      onClick={onClick}
    >{label}</button>
  )
}

Button.defaultProps = {
  color: 'steelblue'
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
