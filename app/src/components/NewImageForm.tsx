import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { classNames } from "~/utils/classNames";
import { imageSizes } from "~/utils/imageSizes";
import LoadingSpinner from "./LoadingSpinner";

const NewImageForm = () => {
  const router = useRouter();

  const { mutate: createImage, isLoading } = api.image.create.useMutation({
    onSuccess: (image) => router.push(`/images/${image.id}`),
  });

  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      {imageSizes.map((imageSize) => (
        <button
          key={imageSize}
          disabled={isLoading}
          onClick={() => createImage({ imageSize })}
          className={classNames(
            "relative overflow-hidden rounded-md px-3.5 py-2.5 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
            !isLoading ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-800"
          )}
        >
          {isLoading && (
            <div className="absolute inset-0 backdrop-blur">
              <LoadingSpinner sm />
            </div>
          )}
          {imageSize}
        </button>
      ))}
    </div>
  );
};

export default NewImageForm;
