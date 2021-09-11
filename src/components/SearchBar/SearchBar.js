import React from "react";

const SearchBar = (props) => {
    return (
        <div className="justify-content-center">
            <form onClick={props.handleFormSubmit}>
                <input
                    onChange={props.handleInputChange}
                    value={props.value}
                    name="search"
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
                />
            </form>
        </div>
    );
};

export default SearchBar;