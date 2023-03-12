import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { api } from "~/utils/api";
import { classNames } from "~/utils/classNames";
import LoadingSpinner from "./LoadingSpinner";

const imageSizes = ["8x8", "16x16", "32x32", "64x64"] as const;

const NewImageForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const { mutate: createImage, isLoading } = api.image.create.useMutation({
    onSuccess: (image) => router.push(`/images/${image.id}`),
  });

  const validTitle = z.string().min(1).max(50).safeParse(title).success;
  const submittable = validTitle && !isLoading;

  return (
    <>
      <label htmlFor="title" className="sr-only">
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        maxLength={50}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        placeholder="Image Title"
      />
      <div className="mt-10 flex items-center justify-center gap-x-6">
        {imageSizes.map((imageSize) => (
          <button
            key={imageSize}
            disabled={!submittable}
            onClick={() => createImage({ title, imageSize })}
            className={classNames(
              "relative overflow-hidden rounded-md px-3.5 py-2.5 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
              submittable ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-800"
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
    </>
  );
};

export default NewImageForm;
