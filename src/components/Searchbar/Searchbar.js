import { useState } from "react";
import { SearchBarStyled, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styled"


export const SearchBar = ({onSubmit}) => {

    const [input, setInput] = useState('');
    const [prevInput, setPrevInput] = useState('');

    const handlerChange = ({ target }) => {
        setInput(target.value);
    };

    const handlerSubmit = evt => {
        evt.preventDefault();
        if (input !== prevInput) {
            onSubmit(input); 
            setPrevInput(input);
        }
    };

    return (
             <SearchBarStyled className="searchbar">
                 <SearchForm className="form" onSubmit={handlerSubmit}>
                     <SearchFormButton type="submit" className="button">
                         <SearchFormButtonLabel className="button-label">Search</SearchFormButtonLabel>
                     </SearchFormButton>
                     <SearchFormInput
                         className="input"
                         type="text"
                         placeholder="Search images and photos"
                         onChange={handlerChange}
                         value={input}
                     />
                 </SearchForm>
             </SearchBarStyled>
         )
}

export default SearchBar;
