import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>GitHub Repository Release Note Generator</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/release_notes' activeClassName='route--active'>
      Release Notes
    </Link>
  </div>
)

export default Header
