
const ShopFilters = ({
  search,
  setSearch,
  category,
  setCategory,
}) => {
  return (
    <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Search
        </label>

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search jewelry..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
        >
          <option value="all">
            All Categories
          </option>

          <option value="Bracelet">
            Bracelets
          </option>

          <option value="Necklace">
            Necklaces
          </option>

          <option value="Ring">
            Rings
          </option>

          <option value="Other">
            Other
          </option>
        </select>
      </div>
    </div>
  );
};

export default ShopFilters;
