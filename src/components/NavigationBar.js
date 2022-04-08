import { NavLink } from 'react-router-dom';
import '../styles/navbar-items.css';
const NavigationBar = () => {
  return (
    <>
      <nav className='flex justify-around mt-5'>
        <NavLink
          className={(navData) =>
            navData.isActive ? 'navbar-item-active' : 'navbar-item'
          }
          to='/bid'
        >
          Bid
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive ? 'navbar-item-active' : 'navbar-item'
          }
          to='chat'
          end
        >
          Chat
        </NavLink>
      </nav>
    </>
  );
};

export default NavigationBar;
