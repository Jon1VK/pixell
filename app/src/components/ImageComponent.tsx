import { useAtomValue } from "jotai";
import { type CSSProperties, type MouseEventHandler } from "react";
import { selectedColorAtom } from "~/atoms/selectedColor";
import { api, type RouterOutputs } from "~/utils/api";

interface ImageComponentProps {
  image: RouterOutputs["image"]["get"];
  width: number;
  height: number;
  colorable?: boolean;
}

const ImageComponent = (props: ImageComponentProps) => {
  const apiUtils = api.useContext();
  const selectedColor = useAtomValue(selectedColorAtom);

  const pixelWidth = props.width / props.image.width;
  const pixelHeight = props.height / props.image.height;

  const handlePixelUpdate = (pixelElement: HTMLElement) => {
    const id = pixelElement.dataset.pixelId;
    const color = pixelElement.dataset.pixelColor;
    if (!props.colorable || !id || !color || color === selectedColor) return;
    apiUtils.pixel.get.setData({ id }, (pixel) => {
      if (pixel) return { ...pixel, color: selectedColor };
    });
    apiUtils.client.pixel.update
      .mutate({ id, color: selectedColor })
      .catch(() => {
        apiUtils.pixel.get.setData({ id }, (pixel) => {
          if (pixel) return { ...pixel, color };
        });
      });
  };

  const handleMouseOver: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.buttons !== 1) return;
    handlePixelUpdate(e.target as HTMLElement);
  };

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== 0) return;
    handlePixelUpdate(e.target as HTMLElement);
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    handlePixelUpdate(e.target as HTMLElement);
  };

  return (
    <div className="overflow-x-auto">
      <div
        className={`grid min-w-max max-w-min grid-cols-${props.image.width} grid-rows-${props.image.height}`}
        style={{ "--selected-bg-color": selectedColor } as CSSProperties}
        onMouseOver={handleMouseOver}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        {props.image.pixels.map((pixel) => (
          <PixelComponent
            key={pixel.id}
            pixel={pixel}
            width={pixelWidth}
            heigth={pixelHeight}
            colorable={props.colorable}
          />
        ))}
      </div>
    </div>
  );
};

interface PixelComponentProps {
  pixel: RouterOutputs["pixel"]["get"];
  width: number;
  heigth: number;
  colorable?: boolean;
}

const PixelComponent = (props: PixelComponentProps) => {
  const pixelQuery = api.pixel.get.useQuery(
    { id: props.pixel.id },
    { initialData: props.pixel, enabled: false }
  );

  const pixel = pixelQuery.data;

  const style = {
    width: props.width,
    height: props.heigth,
    "--bg-color": pixel.color,
  } as CSSProperties;

  return props.colorable ? (
    <button
      className="pixel pixel-colorable border hover:border-gray-900"
      style={style}
      data-pixel-id={pixel.id}
      data-pixel-color={pixel.color}
    />
  ) : (
    <div className="pixel border" style={style} />
  );
};

export default ImageComponent;
