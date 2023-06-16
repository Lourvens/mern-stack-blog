import clsx from "clsx";

const TabNavigation = ({ items, selectedValue, onChange }: Props) => {
  return (
    <ul className="p-3 flex gap-3 overflow-x-auto">
      {items.map((item) => (
        <li key={item}>
          <button
            className={clsx(
              `btn btn-ghost px-6 rounded-full`,
              selectedValue == item && "btn-active"
            )}
            onClick={() => {
              onChange(item);
            }}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TabNavigation;

interface Props {
  items: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}
