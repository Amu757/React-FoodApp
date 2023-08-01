import { useContext, useState } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

const Search = (props) => {
  const { theme } = useContext(ThemeContext);

  const { searchdata } = props;

  const [inputval, setInputVal] = useState("");

  const handleinput = (event) => {
    const { value } = event.target;
    setInputVal(value);
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    searchdata(inputval);
  };

  return (
    <form onSubmit={handlesubmit} className="Search">
      <input
        type="text"
        onChange={handleinput}
        name="search"
        placeholder="Search Recipes"
        id="search"
      />
      <button style={theme ? { backgroundColor: "#12343b" } : {}} type="submit">
        Search Recipe
      </button>
    </form>
  );
};

export default Search;
