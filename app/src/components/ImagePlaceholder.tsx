import { type CSSProperties } from "react";

interface ImagePlaceholderProps {
  width: number;
  height: number;
}

const ImagePlaceholder = (props: ImagePlaceholderProps) => {
  const pixelStyle = {
    width: props.width / 16,
    height: props.height / 16,
    "--bg-color": "#cccccc",
  } as CSSProperties;

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-max max-w-min grid-cols-16 grid-rows-16">
        {Array.from({ length: 256 }, (_, index) => (
          <div key={index} className="pixel border" style={pixelStyle} />
        ))}
      </div>
    </div>
  );
};

export default ImagePlaceholder;
