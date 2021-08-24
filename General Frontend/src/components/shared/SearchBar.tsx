import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const SearchBar = (keyword: string, setKeyword: (a: string) => void) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"Search Careers"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
