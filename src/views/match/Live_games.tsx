import React, { useContext, useEffect, useState } from "react";
import { Match } from "../../types/matches";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { getMatch, setPreferences } from "../../utils/apiUtils";
import { SignalIcon } from "@heroicons/react/24/solid";
import Loading from "../../components/Loading";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../../context/user";
import { BookmarkSlashIcon, SignalSlashIcon } from "@heroicons/react/20/solid";
import { Preferences } from "../../types/user";
import swal from "sweetalert2";

const get_Live_match =
  (id: number) => async (setMatch: (data: Match) => void) => {
    const data: Match = await getMatch(id);
    
    setMatch(data);
  };

const update_per = async (preferences: Preferences) => {
  await setPreferences({ preferences: preferences });
};

function Live_Game(props: {
  id: number;
  Favorite: boolean;
  game_playing: boolean;
}) {
  const { user, setUser } = useContext(UserContext);
  const { id, Favorite, game_playing } = props;
  const [match, setMatch] = useState<Match>();
  useEffect(() => {
    get_Live_match(id)(setMatch);
  }, [id]);

  // const set_save_Match = () => {
    
  //   if (user && match) {
  //     if (user.preferences.matches?.includes(match.id)) {
  //       const newPreferences = {
  //         ...user.preferences,
  //         matches: user.preferences.matches.filter((id) => id !== match.id),
  //       };
  //       setUser({ ...user, preferences: newPreferences });
  //       setSaved(false);
  //     } else {

  //       swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Your Favorite Match saved!',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       const newPreferences = {
  //         ...user.preferences,
  //         matches: [...(user.preferences.matches || []), match.id],
  //       };
  //       setUser({ ...user, preferences: newPreferences });
  //       setSaved(true);
  //     }
  //   }
  // };

  const refresh = () => {
    swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Refreshing match...',
              showConfirmButton: false,
              timer: 1000
            })
    get_Live_match(id)(setMatch);
    
  };

  if (!match) {
    return (
      <div
        className="flex flex-col items-center justify-center p-4 rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-900 m-2 
    flex-grow-0 flex-shrink-0 w-64
    bg-white dark:bg-slate-700 dark:text-slate-300"
      >
        <Loading />
      </div>
    );
  }
  return (
    <div
      className="flex flex-col p-4 rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-900 m-2 
      flex-grow-0 flex-shrink-0 w-64
      bg-white dark:bg-slate-700 dark:text-slate-300"
    >
      <div className="font-bold text-lg mb-1 flex justify-between w-full items-start">
        <span>
          <div className="flex gap-4 text-green-500 font-normal items-center text-base">
            {/* {Favorite && (
              <span className="flex gap-1 items-center">
                <StarIcon className="w-5 h-5 text-green-500" />
                {"Favorite"}
              </span>
            )} */}
            {game_playing && (
              <span className="flex gap-1 items-center">
                {<SignalIcon className="w-6 h-6" />}Live...
              </span>
            )}
            {!game_playing && (
              <span className="flex gap-1 items-center text-red-800">
                {<SignalSlashIcon className="w-6 h-6 text-red-400" />}Live
              </span>
            )}
          </div>
          {match.sportName}
        </span>
        <div className="flex gap-1">
          {/* {user != null && (
            <button onClick={set_save_Match}>
              {user?.preferences.matches?.includes(match.id) ? (
                <BookmarkSlashIcon className="w-5 h-5 hover:scale-110 text-red-400" />
              ) : (
                <BookmarkIcon className="w-5 h-5 hover:scale-110" />
              )}
            </button>
          )} */}
          <button>
            <ArrowPathIcon
              className="w-5 h-5 hover:scale-110"
              onClick={refresh}
            />
          </button>
        </div>
      </div>
      <p className="my-1">{match.location}</p>
      {Object.keys(match.score).map((key) => (
        <p key={key} className="flex w-full justify-between">
          <span>
            <b>{key}</b>
          </span>
          <span>{match.score[key as keyof Match]}</span>
        </p>
      ))}
    </div>
  );
}

export default Live_Game;
