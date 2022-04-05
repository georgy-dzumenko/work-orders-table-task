import {debounce} from 'lodash'
import { useCallback, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

export const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [query, setQuery] = useState<string>('');

  const onSearch = useCallback(debounce((queryString) => {
    searchParams.set("query", queryString);
    navigate({search: searchParams.toString()});
  }, 500), [])

  return (
    <input
      onChange={(event) => {
        setQuery(event.target.value);
        onSearch(event.target.value)
      }}
      placeholder="Search"
      type="text"
      className="search"
      value={query}
    />
  )
  
}