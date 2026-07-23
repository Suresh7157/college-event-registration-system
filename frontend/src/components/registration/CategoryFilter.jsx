function CategoryFilter({
    selectedCategory,
    setSelectedCategory
}) {

    const categories = [
        "All",
        "Technical",
        "Workshop",
        "Seminar"
    ];

    return (

        <div className="mb-4">

            {categories.map((category) => (

                <button
                    key={category}
                    className={
                        selectedCategory === category
                            ? "btn btn-primary me-2 mb-2"
                            : "btn btn-outline-primary me-2 mb-2"
                    }
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>

            ))}

        </div>

    );
}

export default CategoryFilter;