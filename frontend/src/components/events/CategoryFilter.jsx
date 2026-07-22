import { useState } from "react";
import "./CategoryFilter.css";

function CategoryFilter() {
  const categories = [
    "All",
    "Technical",
    "Workshop",
    "Cultural",
    "Sports",
    "Other",
  ];

  const [selected, setSelected] = useState("All");

  return (
    <div className="category-wrapper mt-3">
      <div className="d-flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn ${
              selected === category
                ? "btn-primary"
                : "btn-outline-primary"
            } rounded-pill`}
            onClick={() => setSelected(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;