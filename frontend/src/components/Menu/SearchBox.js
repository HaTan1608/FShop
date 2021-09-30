import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { BsSearch } from 'react-icons/bs';
const SearchBox = (props) => {

    const [name, setName] = useState('');
    return (
        <div className="header__search">
            <input type="text" className="header__search__input" placeholder="Bạn cần mua gì" onChange={(e) => setName(e.target.value)} onKeyDown={(e) => (e.key === 'Enter') && (console.log(props.history))} />
            <span className="header__search__button"><Link to={`/search/name/${name}`}><BsSearch size={18} /></Link></span>
        </div>
    )
}
export default SearchBox