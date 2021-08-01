import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'

function Header({ title, showAdd, onAdd }) {
  function onClick(e) {
    // console.log(e)
    onAdd()
  }

  const location = useLocation()

  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          label={showAdd ? 'Cancel' : 'Add'}
          bgColor={showAdd ? 'red' : 'green'}
          onClick={onClick}
        />
      )}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string // could add .isRequired to end to make this input prop required
}

export default Header
