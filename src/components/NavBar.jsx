import PropTypes from 'prop-types'
import logo from '../assets/logo.svg'

function NavBar({ navItems, currentPath, onNavigate, isScrolled }) {
  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <button className="logo" onClick={() => onNavigate('/')} aria-label="YapRadar Home">
          <img src={logo} alt="YapRadar" className="logo-img" />
        </button>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.path}
                type="button"
                className={`nav-link ${currentPath === item.path ? 'active' : ''}`}
                onClick={() => onNavigate(item.path)}
              >
                <IconComponent size={18} className="nav-link-icon" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

NavBar.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentPath: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  isScrolled: PropTypes.bool.isRequired,
}

export default NavBar
