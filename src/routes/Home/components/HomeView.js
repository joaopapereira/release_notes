import React from 'react'
import './HomeView.scss'

export const HomeView = () => (
  <div className='container'>
    <div className='row'>
      Generating a Release Note from Github repository is no longer a problem.<br /><br />
      In 3 simple steps
      <div className='row'>
        <div className='col-md-4 text-align-left'>
          <ul>
            <li>
              Write the name of the repository
            </li>
            <li>
              Select the start date
            </li>
            <li>
              Press the button and wait for the information
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default HomeView
