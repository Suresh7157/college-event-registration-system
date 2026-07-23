// import "./FilterBar.css";
// import SearchBar from "./SearchBar";
// import CategoryFilter from "./CategoryFilter";

// function FilterBar() {
//   return (
//     <section className="filter-bar py-4">
//       <div className="container">

//         <SearchBar />

//         <CategoryFilter />

//       </div>
//     </section>
//   );
// }

// export default FilterBar;

import "./FilterBar.css";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";

function FilterBar() {
  return (
    <section className="filter-bar py-4">
      <div className="container">

        <SearchBar />

        <StatusFilter />

      </div>
    </section>
  );
}

export default FilterBar;