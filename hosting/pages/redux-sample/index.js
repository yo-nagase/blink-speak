import MoviePlaylist from "../../features/redux-sample/components/MoviePlaylist";
import SongPlaylist from "../../features/redux-sample/components/SongPlaylist";

export default function DayPage() {
  const handleResetClick = () => {
    //
  };
  return (
    <div className="container is-fluid">
      <button onClick={() => handleResetClick()} className="button is-danger">
        Reset Both Playlists
      </button>
      <hr />
      <MoviePlaylist />
      <hr />
      <SongPlaylist />
    </div>
  );
}
