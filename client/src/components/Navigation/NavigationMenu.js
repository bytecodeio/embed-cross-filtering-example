// This is simply the hamburger navigation menu
import React from 'react'
import { Menu, MenuItem, IconButton } from '@looker/components'
import { Menu as MenuIcon} from '@styled-icons/material/Menu'
import { NavLink } from 'react-router-dom';

export const NavigationMenu = ({menuToggle, routes}) => {
    return (
      <>
        <div className={menuToggle?"navigation open":"navigation collapse"}>
          {routes.examples.length > 0 &&
            <ul className='nav-list'>
              {routes.examples.map(r => {
                return(
                  <li key={r.text}>
                    <NavLink activeclassname='active' to={r.url}>
                      <div  className='nav-item'>                        
                        {r.text}
                      </div>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          }
        </div>
      </>
    )
}