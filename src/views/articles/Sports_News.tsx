import React, { useContext, useEffect, useState } from "react";
import { Article } from "../../types/articles";
import ArticleModal from "./ArticleModal";
import { UserContext } from "../../context/user";
import { Preferences } from "../../types/user";
import { setPreferences } from "../../utils/apiUtils";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkSlashIcon } from "@heroicons/react/24/solid";
import swal from "sweetalert2";
const updatePreferences = async (preferences: Preferences) => {
  await setPreferences({ preferences: preferences });
};

function ArticleTile(prop: { article: Article }) {
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState<boolean | null>(null);
  const { article } = prop;

  useEffect(() => {
    if (saved === null) return;
    if (user) {
      updatePreferences(user.preferences);
    }
  }, [saved]);

  const saveArticle = () => {
    if (user && article) {
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'News UnSaved!',
        showConfirmButton: false,
        timer: 1000
      })
      if (user.preferences.articles?.includes(article.id)) {
        const newPreferences = {
          ...user.preferences,
          articles: user.preferences.articles.filter((id) => id !== article.id),
        };
        setUser({ ...user, preferences: newPreferences });
        setSaved(false);
      } else {
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'News Saved!',
          showConfirmButton: false,
          timer: 1000
        })
        const newPreferences = {
          ...user.preferences,
          articles: [...(user.preferences.articles || []), article.id],
        };
        setUser({ ...user, preferences: newPreferences });
        setSaved(true);
      }
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-900 my-4 mx-2 
            flex-grow-0 flex-shrink-0
            bg-white dark:bg-slate-700 dark:text-slate-300"
    >
      <div className="w-full sm:w-48 shrink-0">
        <img
          src={article.thumbnail}
          alt={article.sport.name}
          title={article.sport.name}
          className="object-cover w-full h-full cursor-pointer max-h-64 rounded-t-md sm:rounded-l-md"
        />
      </div>
      <div className="flex flex-col p-4 w-full justify-between">
        <div className="flex w-full justify-between">
          <p className="mb-1 px-1.5 py-1 rounded-md  font-serif dark:bg-slate-600 w-min whitespace-nowrap">
            {article.sport.name}
          </p>
          {user != null && (
            <button onClick={saveArticle}>
              {user?.preferences.articles?.includes(article.id) ? (
                <BookmarkSlashIcon className="w-8 h-8 hover:scale-110 text-green-500" />
              ) : (
                <BookmarkIcon className="w-8 h-8 hover:scale-110" />
              )}
            </button>
          )}
        </div>

        <p className="font-serif font-bold text-2xl mb-1 flex justify-between w-full items-center">
          {article.title}
        </p>
        <p className="mt-1">{article.summary}</p>
        <div className="flex justify-between">
          <p className="text-gray-800 dark:text-gray-200 italic mt-4 text-sm">
            {new Date(article.date).toDateString()}
          </p>
          <button className="text-blue-500 underline" onClick={() => setOpen(true)}>...Read More</button>
        </div>
      </div>
      <ArticleModal article={article} open={open} setOpen={setOpen} />
    </div>
  );
}

export default ArticleTile;
