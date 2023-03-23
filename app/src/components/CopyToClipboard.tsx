import { ClipboardIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useState } from "react";

const CopyToClipboard = () => {
  const router = useRouter();
  const url = `${window?.location.origin}${router.asPath}`;

  const [showNotification, setShowNotification] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(url);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2500);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-between rounded-md bg-indigo-600/20 px-4 text-left text-white/50 shadow-sm hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      >
        <span className="overflow-hidden text-ellipsis py-3 leading-none">
          {url}
        </span>
        <ClipboardIcon className="ml-3 h-5 w-5 flex-shrink-0" />
      </button>
      <p className="mt-2 text-xs text-gray-300">
        {showNotification
          ? "Copied to clipboard"
          : "Collaborate with others by sharing the link"}
      </p>
    </div>
  );
};

export default CopyToClipboard;
