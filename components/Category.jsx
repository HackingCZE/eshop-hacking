import Link from 'next/link';
import React from 'react'

const Category = ({ category }) => {
    return (
        <div>
            <li className="menu-category" >
                {console.log(category)}
                <Link href={`/search/${category.slug.current}`} className="menu-title">{category.name} </Link>

                <ul className="dropdown-list">
                    {category.subsections?.map((subsection) =>
                        <li className="dropdown-item" key={subsection._id}>

                            <Link href={`/search/${subsection.slug.current}`}>{subsection.name}</Link>
                        </li>)}
                </ul>
            </li>
        </div>
    )
}

export default Category;