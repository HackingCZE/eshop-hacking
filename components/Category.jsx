import React from 'react'

const Category = ({ category }) => {
    return (
        <li className="menu-category">
           { console.log(category)}
            <a href="#" className="menu-title">{category.name} </a>
 
            <ul className="dropdown-list">
                {category.subsections?.map((subsection) =>
                    <li className="dropdown-item">
                        <a href="#">{subsection.name}</a>
                    </li>)}
            </ul>
        </li>

    )
}

export default Category;