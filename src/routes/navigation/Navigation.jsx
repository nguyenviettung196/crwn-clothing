import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as CLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/UserContext';
import { signOutUser } from '../../utils/firebase/firebase';
import CartIcon from '../../components/cart-icon/CartIcon';
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import { CartContext } from '../../contexts/CartContext';

import { NavigationContainer, NavLink, LogoContainer, NavLinks } from './Navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  // console.log(currentUser);

  return (
    <>
      <NavigationContainer>
        <LogoContainer className='logo-container' to='/'>
          <CLogo className='logo' />
        </LogoContainer>
        <NavLinks className='nav-links-container'>
          <NavLink className='nav-link' to='/shop'>SHOP</NavLink>
          {
            currentUser ?
              (<NavLink as='span' className='nav-link' onClick={signOutUser}>SIGN OUT</NavLink>)
              : (<NavLink className='nav-link' to='/auth'>SIGN IN</NavLink>)
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;