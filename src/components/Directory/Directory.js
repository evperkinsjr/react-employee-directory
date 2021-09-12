import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import EmployeeTable from "../EmployeeTable/EmployeeTable";
import API from "../../utils/API";

class Directory extends React.Component {
    state = {
      search: "",
      employees: [],
      filteredEmployees: [],
      sortDirections: this.initialSortDirections,
    };
  
    get initialSortDirections() {
      return {
        name: "",
        email: "",
        phone: "",
      };
    }
  
    // When component mounts, load "employees" from Random User API
    componentDidMount() {
      API.search()
        .then((res) =>
          this.setState({
            employees: res.data.results,
            filteredEmployees: res.data.results,
          })
        )
        .catch((err) => console.log(err));
    }
  
    // Update search state to filter by employee name
    handleInputChange = (event) => {
      const value = event.target.value;
      this.setState({ search: value });
      this.filterEmployees(value.toLowerCase().trim());
    };
  
    handleFormSubmit = (event) => {
      event.preventDefault();
    };
  
    // Sort by last name, then first.
    sortBy = (key, primary = 0, secondary = 0) => {
      let sortedEmployees = this.state.filteredEmployees;
      if (this.state.sortDirections[key]) {
        this.setState({
          filteredEmployees: sortedEmployees.reverse(),
          sortDirections: {
            ...this.initialSortDirections,
            [key]: this.state.sortDirections[key] === "asc" ? "desc" : "asc",
          },
        });
      } else {
        sortedEmployees = this.state.filteredEmployees.sort((a, b) => {
          a = a[key];
          b = b[key];
  
          // If last names match, then sort that instance by first name.
          if (primary) {
            if (secondary && a[primary] === b[primary]) {
              return a[secondary].localeCompare(b[secondary]);
            }
            return a[primary].localeCompare(b[primary]);
          } else {
            return a.localeCompare(b);
          }
        });
  
        this.setState({
          filteredEmployees: sortedEmployees,
          sortDirections: {
            ...this.initialSortDirections,
            [key]: "asc",
          },
        });
      }
    };
  
    filterEmployees = (input) => {
      if (input) {
        this.setState({
          filteredEmployees: this.state.employees.filter((employee) => {
            return (
              employee.name.first
                .toLowerCase()
                .concat(" ", employee.name.last.toLowerCase())
                .includes(input) ||
              employee.email.includes(input) ||
              employee.phone.includes(input) ||
              employee.phone.replace(/[^\w\s]/gi, "").includes(input)
            );
          }),
        });
      } else {
        this.setState({ filteredEmployees: this.state.employees });
      }
    };
  
    render() {
      return (
        <div>
          <SearchBar
            value={this.state.search}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
          <div className="container mt-4">
            <EmployeeTable
              state={this.state}
              sortBy={this.sortBy}
              filterEmployees={this.filterEmployees}
            />
          </div>
        </div>
      );
    }
  }
  
  export default Directory;