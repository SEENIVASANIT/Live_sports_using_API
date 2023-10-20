import React, { useContext, useEffect, useState } from "react";
import { Sport, Sports } from "../../types/sports";
import { Article } from "../../types/articles";
import Sports_News from "./Sports_News";
import { getArticles, getSports } from "../../utils/apiUtils";
import Loading from "../../components/Loading";
import { UserContext } from "../../context/user";
import { User } from "../../types/user";
import { BoltSlashIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkSlashIcon } from "@heroicons/react/20/solid";


const fetchSports = async (setSportsCB: (data: any) => void) => {
  const data: Sports = await getSports();
  console.log(data);
  setSportsCB(data);
};

const fetchNews = async (setNewsCB: (data: Article[]) => void) => {
  const data: Article[] = await getArticles();
  console.log(data);
  setNewsCB(data);
};

const filteredNews = (news: Article[], sport: Sport) => {
  const list = news.filter((article) => {
    return article.sport.id === sport.id;
  });
  return list;
};

const filterFavorites = async (
  articles: Article[],
  setFavList: (data: Article[]) => void,
  user: User | null
) => {
  if (user) {
    const userSports = user.preferences.sports
      ? user?.preferences.sports.map((sport) => sport.name)
      : [];
    const userTeams = user.preferences.teams
      ? user?.preferences.teams.map((team) => team.id)
      : [];
    const filtered = articles.filter(
      (article) =>
        userSports.includes(article.sport.name) ||
        userTeams.includes(article.teams[0]?.id || article.teams[1]?.id)
    );
    setFavList(filtered);
  }
};

function NewsSection() {
  const { user } = useContext(UserContext);
  const [sports, setSports] = useState<Sports>();
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [news, setNews] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [favList, setFavList] = useState<Article[]>([]);
  const [showFav, setShowFav] = useState<boolean>(false);
  const [showSaved, setShowSaved] = useState<boolean>(false);
  const [saved, setSaved] = useState<Article[]>([]);

  useEffect(() => {
    fetchSports(setSports);
    fetchNews(setNews);
  }, []);

  useEffect(() => {
    if (!showFav && !showSaved) {
      if (selectedSport && news) {
        const list = filteredNews(news, selectedSport);
        setFiltered(list);
      }
      if (selectedSport == null) {
        setFiltered(news || []);
      }
    } else if (showFav) {
      setFiltered(favList);
    } else if (showSaved) {
      setFiltered(saved);
    }
  }, [selectedSport, news, showFav, favList, showSaved, saved]);

  useEffect(() => {
    filterFavorites(news, setFavList, user);
    if (user) {
      setShowFav(true);
    }
  }, [user, news]);

  useEffect(() => {
    if (user) {
      const savedArticles = news.filter((article) =>
        user.preferences.articles?.includes(article.id)
      );
      setSaved(savedArticles);
    }
  }, [user, news]);

  if (!news) {
    return (
      <div
        className="flex flex-col items-center justify-center m-2 
    flex-grow-0 flex-shrink-0 w-full h-full"
      >
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="m-4 text-gray-500 text-4xl font-bold font-serif">
        Trending News
      </div>
      <div className="mb-4 border-b flex border-gray-200  dark:border-gray-700">
        <ul
          className="flex overflow-x-scroll justify-around w-11/12  dark:scbard mb-px text-sm font-medium text-center"
          id="myTab"
        >
          {user != null && (
            <li key={0} className="mr-2">
              <button
                className={`${
                  showFav && !showSaved
                    ? "bg-gray-500/30 dark:bg-gray-500/30 text-black"
                    : ""
                } inline-block p-4 rounded-t-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 font-semibold font-serif`}
                id="profile-tab"
                type="button"
                onClick={() => {
                  setShowFav(true);
                  setShowSaved(false);
                }}
              >
                Your Favorites
              </button>
            </li>
          )}
          <li key={"x"} className="mr-2">
            <button
              className={`${
                selectedSport === null && !showFav && !showSaved
                  ? "bg-gray-500/30 dark:bg-gray-500/30 text-black"
                  : ""
              } inline-block p-4 rounded-t-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 font-semibold font-serif`}
              id="profile-tab"
              type="button"
              onClick={() => {
                setShowFav(false);
                setShowSaved(false);
                setSelectedSport(null);
              }}
            >
              All Sports
            </button>
          </li>
          {sports?.sports.map((sport) => (
            <li key={sport.id} className="mr-2">
              <button
                className={`${
                  selectedSport === sport && !showFav && !showSaved
                    ? "bg-gray-500/30 dark:bg-gray-500/30 text-black"
                    : ""
                } inline-block p-4 rounded-t-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 font-semibold font-serif`}
                id="profile-tab"
                type="button"
                onClick={() => {
                  setShowFav(false);
                  setShowSaved(false);
                  setSelectedSport(sport);
                }}
              >
                {sport.name}
              </button>
            </li>
          ))}
          {/* {user != null ? (
            <li key={"s"} className="mr-2">
              <BookmarkIcon className={`${
                  showSaved && !showFav
                    ? "bg-gray-500/30 dark:bg-gray-500/30 text-black"
                    : ""
                } w-8 h-8 hover:scale-110`} onClick={() => {
                  setShowFav(false);
                  // setSelectedSport(null);
                  setShowSaved(true);
                }} />
              {/* <button
                className={`${
                  showSaved && !showFav
                    ? "bg-green-400/30 dark:bg-green-600/30"
                    : ""
                } inline-block p-4 rounded-t-lg text-green-600 hover:text-green-700 dark:hover:text-green-500`}
                id="profile-tab"
                type="button"
                onClick={() => {
                  setShowFav(false);
                  // setSelectedSport(null);
                  setShowSaved(true);
                }}
              >
                Saved
              </button> }
            </li>
          ) : null} */}
        </ul>
        {user != null ? (
            <div className="flex-col items-center justify-center  text-end w-24">
            <div>{
                showSaved && !showFav
                  ? <BookmarkSlashIcon className={` w-8 h-8 hover:scale-110 cursor-pointer text-green-400 ml-14`} onClick={() => {
                    setShowFav(false);
                    // setSelectedSport(null);
                    setShowSaved(true);
                  }} />
              
                  : <BookmarkIcon className={`
                   w-8 h-8 hover:scale-110  text-gray-400 cursor-pointer ml-14`} onClick={() => {
                    setShowFav(false);
                    
                    setShowSaved(true);
                  }} />
              
              }
              </div>
              <p className="text-black font-bold font-serif">Saved</p>
            
            </div>
        ) : null}
      </div>
      <div className="h-[80vh] overflow-y-scroll  dark:scbard">
        {filtered.length > 0 ? (
          filtered?.map((article) => (
            <Sports_News key={article.id} article={article} />
          ))
        ) : (
          <div className="text-center text-gray-400">
            {showFav
              ? "No Favorites seleted yet!"
              : "No saved new yet."}
          </div>
        )}
      </div>
    </>
  );
}

export default NewsSection;
