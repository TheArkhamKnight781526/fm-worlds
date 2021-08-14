import React from 'react';
import { useDispatch } from 'react-redux';
import { swap } from '../redux/theme';
import * as header from './css/header.module.css';
import { FaMoon, FaRegMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header(props) {
    const capitalize = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const dispatch = useDispatch();
    var { theme } = props;
    return (
        <div className={header.header}>
            <Link to="/" className={header.logo}><h1>Where in the world?</h1></Link>
            <div className={header.theme} onClick={() => dispatch(swap())}>
                {theme === 'dark' ? <FaMoon className={header.icon}/> : <FaRegMoon className={header.icon} />}
                <span>{capitalize(theme)} Mode</span>
            </div>
      </div>
    )
}
