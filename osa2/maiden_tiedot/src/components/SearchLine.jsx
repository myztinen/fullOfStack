const SearchLine = ({ nameSearch, handleSearchChange }) => {
    return (<div>
        find countries <input value={nameSearch} onChange={handleSearchChange} />
    </div>
    )
}

export default SearchLine