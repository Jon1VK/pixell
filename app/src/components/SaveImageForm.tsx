import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { api } from "~/utils/api";
import { classNames } from "~/utils/classNames";
import LoadingSpinner from "./LoadingSpinner";

const SaveImageForm = () => {
  const router = useRouter();
  const imageId = router.query.imageId as string;

  const [title, setTitle] = useState("");

  const { mutate: saveImage, isLoading: isSaving } =
    api.image.save.useMutation();

  const isValidTitle = z.string().min(1).max(50).safeParse(title);
  const isSavable = isValidTitle && !isSaving;

  return (
    <div className="grid gap-3 gap-y-4 sm:grid-cols-3">
      <div className="sm:col-span-2">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          maxLength={50}
          onChange={(e) => setTitle(e.currentTarget.value)}
          className="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          placeholder="Image Title"
        />
      </div>
      <button
        disabled={!isSavable}
        onClick={() => saveImage({ id: imageId, title })}
        className={classNames(
          "relative mx-auto w-min rounded-md py-2 px-4 text-sm font-medium text-white shadow-sm ring-2 ring-inset ring-transparent focus:outline-none focus:ring-white sm:w-full",
          isSavable ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-800"
        )}
      >
        {isSaving && (
          <div className="absolute inset-0 backdrop-blur">
            <LoadingSpinner sm />
          </div>
        )}
        Save
      </button>
    </div>
  );
};

export default SaveImageForm;
