import PropTypes from 'prop-types'

function MobileTabBar({ navItems, currentPath, onNavigate }) {
  return (
    <nav className="mobile-tabbar" aria-label="Mobile tabs">
      {navItems.map((item) => {
        const IconComponent = item.icon
        return (
          <button
            key={item.path}
            type="button"
            className={currentPath === item.path ? 'active' : ''}
            onClick={() => onNavigate(item.path)}
          >
            <IconComponent size={20} strokeWidth={2} />
            <span>{item.label.split(' ')[0]}</span>
          </button>
        )
      })}
    </nav>
  )
}

MobileTabBar.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.any,
    }),
  ).isRequired,
  currentPath: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
}

export default MobileTabBar
