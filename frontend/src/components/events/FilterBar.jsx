import "./FilterBar.css";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

function FilterBar() {
  return (
    <section className="filter-bar py-4">
      <div className="container">

        <SearchBar />

        <CategoryFilter />

      </div>
    </section>
  );
}

export default FilterBar;