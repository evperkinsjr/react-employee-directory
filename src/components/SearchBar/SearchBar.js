import React from "react";

const SearchBar = (props) => {
    return (
        <div>
            <form onClick={props.handleFormSubmit} className="w-75 mx-auto">
                <input
                    onChange={props.handleInputChange}
                    value={props.value}
                    name="search"
                    type="text"
                    className="form-control text-center"
                    placeholder="Search by Name"
                />
            </form>
        </div>
    );
};

export default SearchBar;