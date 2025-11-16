import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Home as HomeIcon, Search, Pencil, User, Crown } from 'lucide-react'
import NavBar from './components/NavBar'
import MobileTabBar from './components/MobileTabBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import Draft from './pages/Draft'
import MyPage from './pages/MyPage'
import Membership from './pages/Membership'
import ProjectDetail from './pages/ProjectDetail'
import { mockCoins } from './data/mockCoins'

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/analyze', label: 'Analyze', icon: Search },
  { path: '/draft', label: 'Draft', icon: Pencil },
  { path: '/membership', label: 'Membership', icon: Crown },
  { path: '/mypage', label: 'My Page', icon: User },
]

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedCoinId, setSelectedCoinId] = useState(mockCoins[0]?.id ?? null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!selectedCoinId && mockCoins.length) {
      setSelectedCoinId(mockCoins[0].id)
    }
  }, [selectedCoinId])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = useMemo(() => NAV_ITEMS, [])

  const handleNavigate = (path) => {
    navigate(path)
  }

  const handleProjectDetail = (coinId) => {
    navigate(`/project/${coinId}`)
  }

  const handleDraftShortcut = (coinId) => {
    setSelectedCoinId(coinId)
    navigate('/draft')
  }

  return (
    <div className="app-shell">
      <NavBar navItems={navItems} currentPath={location.pathname} onNavigate={handleNavigate} isScrolled={isScrolled} />
      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <Home
                onViewAnalyze={() => navigate('/analyze')}
                onViewDraft={() => navigate('/draft')}
                onSelectProject={handleProjectDetail}
              />
            )}
          />
          <Route
            path="/analyze"
            element={<Analyze onSelectProject={handleProjectDetail} onLaunchDraft={handleDraftShortcut} />}
          />
          <Route
            path="/draft"
            element={<Draft selectedCoinId={selectedCoinId} onSelectCoin={setSelectedCoinId} />}
          />
          <Route path="/membership" element={<Membership />} />
          <Route path="/mypage" element={<MyPage onSelectProject={handleProjectDetail} />} />
          <Route
            path="/project/:projectId"
            element={<ProjectDetail onDraftWithCoin={handleDraftShortcut} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <MobileTabBar navItems={navItems} currentPath={location.pathname} onNavigate={handleNavigate} />
    </div>
  )
}

export default App
