import { useAtom } from "jotai";
import { type ChangeEventHandler, useRef } from "react";
import { selectedColorAtom } from "~/atoms/selectedColor";

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom);
  const throttleRef = useRef(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (throttleRef.current) return;
    throttleRef.current = true;
    setSelectedColor(e.currentTarget.value);
    setTimeout(() => (throttleRef.current = false), 100);
  };

  return (
    <input
      type="color"
      name="selectedColor"
      id="selectedColor"
      value={selectedColor}
      onChange={handleChange}
      className="mx-auto mt-10 block border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
    />
  );
};

export default ColorSelector;
