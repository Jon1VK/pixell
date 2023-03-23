import { useRouter } from "next/router";
import ColorSelector from "~/components/ColorSelector";
import CopyToClipboard from "~/components/CopyToClipboard";
import ImageComponent from "~/components/ImageComponent";
import ImagePlaceholder from "~/components/ImagePlaceholder";
import SaveImageForm from "~/components/SaveImageForm";
import { api } from "~/utils/api";
import { classNames } from "~/utils/classNames";

const ImagePage = () => {
  const router = useRouter();
  const imageId = router.query.imageId as string;

  const imageQuery = api.image.get.useQuery({ id: imageId });
  const image = imageQuery.data;

  return (
    <div
      className={classNames(
        "text-center",
        imageQuery.isLoading ? "animate-pulse blur-md" : ""
      )}
    >
      {(imageQuery.isLoading || imageQuery.isError || image?.isFinished) && (
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {imageQuery.isLoading && "Placeholder"}
          {imageQuery.isError && "Image not found"}
          {image?.isFinished && image.title}
        </h1>
      )}
      {image && !image.isFinished && (
        <div className="mx-auto flex max-w-lg flex-col gap-20">
          <CopyToClipboard />
          <SaveImageForm />
        </div>
      )}
      <div className="mt-20 flex flex-col items-center gap-6">
        {imageQuery.isLoading && <ImagePlaceholder width={512} height={512} />}
        {image && !image.isFinished && (
          <>
            <ColorSelector />
            <ImageComponent image={image} width={512} height={512} colorable />
          </>
        )}
        {image && image.isFinished && (
          <ImageComponent image={image} width={512} height={512} />
        )}
      </div>
    </div>
  );
};

export default ImagePage;
