// This is simply the hamburger navigation menu
import React from 'react'
import { Menu, MenuItem, IconButton } from '@looker/components'
import { Menu as MenuIcon} from '@styled-icons/material/Menu'
import { Link } from 'react-router-dom';

export const MenuButton = ({setMenuToggle, menuToggle}) => {
    const handleMenuToggle = () => {
      setMenuToggle(!menuToggle);
    }
    return (
      <IconButton onClick={handleMenuToggle} size='large'  icon={<MenuIcon />}/>
    )
}