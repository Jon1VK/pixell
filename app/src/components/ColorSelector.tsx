import { useAtom } from "jotai";
import {
  type ChangeEventHandler,
  startTransition,
  useDeferredValue,
} from "react";
import { selectedColorAtom } from "~/atoms/selectedColor";

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom);
  const deferredSelectedColor = useDeferredValue(selectedColor);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    startTransition(() => setSelectedColor(e.currentTarget.value));
  };

  return (
    <input
      type="color"
      name="selectedColor"
      id="selectedColor"
      value={deferredSelectedColor}
      onChange={handleChange}
      className="block border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
    />
  );
};

export default ColorSelector;
