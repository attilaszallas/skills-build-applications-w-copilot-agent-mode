import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/activities" aria-label="Octofit home">
          <img src={logo} alt="" className="brand-logo" />
          <span className="brand-copy">
            <span className="brand-name">Octofit</span>
            <span className="brand-caption">TRAIN TOGETHER</span>
          </span>
        </NavLink>
        <div className="topbar-note">
          <span className="status-dot" />
          Movement, measured
        </div>
      </header>

      <nav className="section-nav" aria-label="Main navigation">
        {navigation.map(({ label, path }) => (
          <NavLink
            className={({ isActive }) => `section-link${isActive ? ' active' : ''}`}
            key={path}
            to={path}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
      <footer className="app-footer">Octofit Tracker <span>|</span> Every effort counts</footer>
    </div>
  )
}

export default App
