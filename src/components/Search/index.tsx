import { ChangeEventHandler } from 'react';
import { Search as SearchIcon } from '@material-ui/icons';

import './styles.css';

type SearchProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Search = ({ onChange }: SearchProps): JSX.Element => {
  return (
    <div className="Search">
      <SearchIcon className="Search__icon" />
      <input
        className="Search__input"
        type="text"
        name="search"
        placeholder="Search"
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
