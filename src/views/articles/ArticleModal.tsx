import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Article } from "../../types/articles";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { getArticle } from "../../utils/apiUtils";
import Loading from "../../components/Loading";

const fetchArticle = async (
  id: number,
  setArticleData: (data: Article) => void
) => {
  const data: Article = await getArticle(id);
  setArticleData(data);
};

export default function ArticleModal(prop: {
  article: Article;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { article, open, setOpen } = prop;
  const [articleData, setArticleData] = useState<Article>(article);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (open) fetchArticle(article.id, setArticleData);
  }, [open, article.id]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-800 dark:bg-opacity-75 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[80vw]">
                <div className="bg-white dark:bg-slate-700">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full text-center sm:text-left">
                      <div className="flex w-full">
                        <div
                          className="w-full h-72 shrink-0 rounded-md"
                          style={{
                            backgroundImage:
                              "url(" + articleData.thumbnail + ")",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <button
                            type="button"
                            className="right-0 top-0 absolute hover:text-red-600"
                            onClick={() => setOpen(false)}
                          >
                            <XCircleIcon className="w-10 h-10 stroke-slate-800 hover:text-red-600 dark:stroke-slate-200" />
                          </button>
                        </div>
                      </div>
                      <div className="flex relative mt-12">
                        <div className="flex flex-col  justify-between mt-[-10px] bg-white dark:bg-slate-700   rounded-md  ml-6">
                          <Dialog.Title
                            as="h3"
                            className="font-serif text-3xl tracking-wide mb-2 font-semibold leading-6 text-gray-900 dark:text-gray-100"
                          >
                            {articleData.title}
                          </Dialog.Title>
                          <p className="landscape:px-2 my-2 p-1.5 rounded-md  dark:bg-slate-600 text-gray-800 dark:text-gray-200 w-min whitespace-nowrap">
                            {articleData.sport.name}
                          </p>
                          <p className="text-gray-800 dark:text-gray-200 italic my-1">
                            {new Date(articleData.date).toUTCString()}
                          </p>
                          {articleData.teams.length === 2 ? (
                            <p className="text-gray-800 dark:text-gray-200 mt-2">
                              Match:{" "}
                              <span className="font-semibold">
                                {articleData.teams[0].name +
                                  " & " +
                                  articleData.teams[1].name}
                              </span>
                            </p>
                          ) : null}
                        </div>
                      </div>
                      {articleData.content ? (
                        <div className="my-4 sm:px-8 p-2">
                          <p className="text-lg text-gray-700 dark:text-gray-200 first-letter:text-3xl tracking-wide">
                            {articleData.content}
                          </p>
                          <button
        onClick={() => setOpen(false)}
        className="w-full bg-green-700 hover:bg-green-800 
        dark:bg-green-500 dark:hover:bg-green-600
        text-white font-semibold py-2 px-4 rounded-md 
        focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Close Dialog
      </button>
                        </div>
                        
                      ) : (
                        <div className="w-full flex justify-center">
                          <Loading />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        
      </Dialog>
    </Transition.Root>
  );
}
