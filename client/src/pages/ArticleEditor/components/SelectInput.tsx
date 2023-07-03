type Prop = {
  onChange: (value: string) => void;
};
const SelectInput = ({ onChange }: Prop) => {
  const categoryItems = [
    "science",
    "leadership",
    "technology",
    "business",
    "health",
    "communication",
  ];

  return (
    <select
      className="select select-primary w-full mb-8"
      onChange={(e) => {
        const selected = categoryItems[e.target.selectedIndex - 1];
        onChange(selected);
      }}
    >
      <option disabled selected>
        choose a category
      </option>
      {categoryItems.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
};

export default SelectInput;
