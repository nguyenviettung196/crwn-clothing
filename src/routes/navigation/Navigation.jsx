import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navigation.scss';

import { ReactComponent as CLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/UserContext';
import { signOutUser } from '../../utils/firebase/firebase';
import CartIcon from '../../components/cart-icon/CartIcon';
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import { CartContext } from '../../contexts/CartContext';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  // console.log(currentUser);

  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          {
            currentUser ?
              (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>)
              : (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
          }
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;