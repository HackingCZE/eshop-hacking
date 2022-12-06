import React, { useState } from 'react'

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const Filter = () => {
    const [isActiveContainer, setActiveContainer] = useState(false);

    const setActive = () => {
        setActiveContainer(!isActiveContainer)
    }
    return (
        <li className="sidebar-menu-category">
            <button className={isActiveContainer ? "sidebar-accordion-menu active" : "sidebar-accordion-menu"} onClick={setActive}>

                <div className="menu-title-flex">
                    <img src="./assets/images/icons/dress.svg" alt="clothes" width="20" height="20"
                        className="menu-title-img" />

                    <p className="menu-title">Clothes</p>
                </div>

                <div>
                {!isActiveContainer &&  <AiOutlineArrowDown className="add-icon" />}
                {isActiveContainer &&  <AiOutlineArrowUp className="remove-icon" />}
                    

                </div>

            </button>
            <ul className="sidebar-submenu-category-list" data-accordion>

                <li className="sidebar-submenu-category">
                    <a href="#" className="sidebar-submenu-title">
                        <p className="product-name">Shirt</p>
                        <data value="300" className="stock" title="Available Stock">300</data>
                    </a>
                </li>

                <li className="sidebar-submenu-category">
                    <a href="#" className="sidebar-submenu-title">
                        <p className="product-name">shorts & jeans</p>
                        <data value="60" className="stock" title="Available Stock">60</data>
                    </a>
                </li>

                <li className="sidebar-submenu-category">
                    <a href="#" className="sidebar-submenu-title">
                        <p className="product-name">jacket</p>
                        <data value="50" className="stock" title="Available Stock">50</data>
                    </a>
                </li>

                <li className="sidebar-submenu-category">
                    <a href="#" className="sidebar-submenu-title">
                        <p className="product-name">dress & frock</p>
                        <data value="87" className="stock" title="Available Stock">87</data>
                    </a>
                </li>

            </ul>
        </li>
    )
}

export default Filter