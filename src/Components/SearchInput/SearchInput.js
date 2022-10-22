import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './SearchInput.css';

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const onChange = (event) => {
    setSearchText(event.target.value);
  }
  const onSearch = (event) => {
    event.preventDefault();
  }
  return (
    <form onSubmit={onSearch} className='search-form'>
      <input name='searchText' className='search-input' value={searchText} onChange={onChange} />
      <button type='button' className='search-btn'><SearchOutlined className='search-icon' /></button>
    </form>
  )
}

export default SearchInput
