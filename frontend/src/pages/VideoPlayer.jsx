// Import React hooks
import {
  useEffect,
  useState
} from 'react';

// Import route parameter hook
import { useParams } from 'react-router-dom';

// Import axios for API requests
import axios from 'axios';

// Import authentication context
import { useAuth } from '../context/AuthContext';

// Import icons
import {
  FaThumbsUp,
  FaThumbsDown,
  FaUserCircle
} from 'react-icons/fa';



// ========================= VIDEO PLAYER COMPONENT =========================
// Video player UI optimization
export default function VideoPlayer() {

  // Get video ID from URL
  const { id } = useParams();

  // Get logged-in user
  const { user } = useAuth();

  // Store video data
  const [video, setVideo] = useState(null);

  // Store new comment text
  const [comment, setComment] = useState('');

  // Store currently editing comment
  const [editingComment, setEditingComment] =
    useState(null);


  // ========================= FETCH VIDEO =========================
  const fetchVideo = async () => {

    // Fetch single video details
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/videos/${id}`
    );

    // Debug backend response
    console.log(res.data);

    // Store video data
    setVideo(res.data);
  };


  // ========================= LOAD VIDEO ON PAGE OPEN =========================
  useEffect(() => {

    // Fetch video whenever ID changes
    fetchVideo();

  }, [id]);


  // ========================= ADD COMMENT =========================
  const addComment = async () => {
    try {

      // Prevent empty comments
      if (!comment.trim()) return;

      // Send add comment request
      await axios.post(
        `${import.meta.env.VITE_API_URL}/comments`,
        {
          videoId: id,
          text: comment
        },
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Clear comment input
      setComment('');

      // Refresh video/comments
      fetchVideo();

    } catch (err) {

      // Log backend error
      console.log(
        err.response?.data || err.message
      );
    }
  };


  // ========================= UPDATE COMMENT =========================
  const updateComment = async (commentId) => {

    // Send update request
    await axios.put(
      `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
      {
        text: editingComment.text
      },
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    // Exit edit mode
    setEditingComment(null);

    // Refresh comments
    fetchVideo();
  };


  // ========================= DELETE COMMENT =========================
  const deleteComment = async (commentId) => {

    // Send delete request
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    // Refresh comments
    fetchVideo();
  };


  // ========================= LIKE VIDEO =========================
  const likeVideo = async () => {

  // Send like request
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/videos/like/${id}`
  );

  // Update likes without refreshing video
  setVideo(prev => ({
    ...prev,
    likes: res.data.likes
  }));
};


  // ========================= DISLIKE VIDEO =========================
  const dislikeVideo = async () => {

  // Send dislike request
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/videos/dislike/${id}`
  );

  // Update dislikes without refreshing video
  setVideo(prev => ({
    ...prev,
    dislikes: res.data.dislikes
  }));
};


  // ========================= LOADING STATE =========================
  if (!video) {
    return (
      <div className="pt-24 text-center text-xl">
        Loading...
      </div>
    );
  }


  // ========================= COMPONENT UI =========================
  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">

      <div className="grid lg:grid-cols-3 gap-8">


        {/* ========================= LEFT SECTION ========================= */}
        <div className="lg:col-span-2">


          {/* ========================= VIDEO PLAYER ========================= */}
          <video
            controls
            className="w-full rounded-2xl bg-black"
            src={video.videoUrl}
          />


          {/* ========================= VIDEO TITLE ========================= */}
          <h1 className="text-2xl font-bold mt-4">
            {video.title}
          </h1>


          {/* ========================= CHANNEL + ACTIONS ========================= */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-4">


            {/* Channel info */}
            <div className="flex items-center gap-3">

              <FaUserCircle className="text-5xl text-gray-500" />

              <div>

                {/* Channel/uploader name */}
                <h3 className="font-semibold text-lg">
                  {video.uploader}
                </h3>

                {/* Video views */}
                <p className="text-gray-500 text-sm">
                  {video.views} views
                </p>

              </div>
            </div>


            {/* Like/Dislike buttons */}
            <div className="flex gap-3">


              {/* Like button */}
              <button
                onClick={likeVideo}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-full"
              >
                <FaThumbsUp />

                {video.likes}
              </button>


              {/* Dislike button */}
              <button
                onClick={dislikeVideo}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-full"
              >
                <FaThumbsDown />

                {video.dislikes}
              </button>

            </div>
          </div>


          {/* ========================= VIDEO DESCRIPTION ========================= */}
          <div className="bg-gray-100 rounded-2xl p-4 mt-5">

            <p className="font-semibold mb-2">
              Description
            </p>

            <p className="text-gray-700">
              {video.description}
            </p>

          </div>


          {/* ========================= COMMENTS SECTION ========================= */}
          <div className="mt-8">

            <h2 className="text-2xl font-bold mb-6">
              Comments
            </h2>


            {/* ========================= ADD COMMENT ========================= */}
            {user && (

              <div className="flex gap-3 mb-8">

                <FaUserCircle className="text-4xl text-gray-500 mt-1" />

                <div className="flex-1">

                  {/* Comment input */}
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) =>
                      setComment(e.target.value)
                    }
                    className="w-full border-b outline-none py-2"
                  />


                  {/* Comment submit button */}
                  <div className="flex justify-end mt-3">

                    <button
                      type="button"
                      onClick={() => addComment()}
                      className="bg-blue-600 text-white px-5 py-2 rounded-full"
                    >
                      Comment
                    </button>

                  </div>
                </div>
              </div>
            )}


            {/* ========================= COMMENT LIST ========================= */}
            <div className="space-y-6">

              {video.comments &&
              video.comments.length > 0 ? (

                // Loop through comments
                video.comments.map((c) => (

                  <div
                    key={c._id}
                    className="flex gap-3"
                  >

                    <FaUserCircle className="text-4xl text-gray-500 mt-1" />

                    <div className="flex-1">


                      {/* Comment username */}
                      <h3 className="font-semibold">
                        {c.userId}
                      </h3>


                      {/* ========================= EDIT COMMENT MODE ========================= */}
                      {editingComment &&
                      editingComment._id === c._id ? (

                        <>
                          {/* Edit textarea */}
                          <textarea
                            value={editingComment.text}
                            onChange={(e) =>
                              setEditingComment({
                                ...editingComment,
                                text: e.target.value
                              })
                            }
                            className="w-full border rounded-lg p-3 mt-2"
                          />


                          {/* Edit action buttons */}
                          <div className="flex gap-3 mt-3">

                            {/* Save button */}
                            <button
                              onClick={() =>
                                updateComment(c._id)
                              }
                              className="bg-blue-600 text-white px-4 py-2 rounded-full"
                            >
                              Save
                            </button>


                            {/* Cancel button */}
                            <button
                              onClick={() =>
                                setEditingComment(null)
                              }
                              className="bg-gray-300 px-4 py-2 rounded-full"
                            >
                              Cancel
                            </button>

                          </div>
                        </>

                      ) : (

                        <>
                          {/* Comment text */}
                          <p className="mt-1 text-gray-800">
                            {c.text}
                          </p>


                          {/* Show edit/delete only for owner */}
                          {user &&
                          user.id === c.userId && (

                            <div className="flex gap-4 mt-2 text-sm">


                              {/* Edit button */}
                              <button
                                onClick={() =>
                                  setEditingComment(c)
                                }
                                className="text-blue-600"
                              >
                                Edit
                              </button>


                              {/* Delete button */}
                              <button
                                onClick={() =>
                                  deleteComment(c._id)
                                }
                                className="text-red-600"
                              >
                                Delete
                              </button>

                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))

              ) : (

                // If no comments exist
                <p className="text-gray-500">
                  No comments yet
                </p>

              )}
            </div>
          </div>
        </div>


        {/* ========================= RIGHT SIDEBAR ========================= */}
        <div className="space-y-4">

          <div className="border rounded-2xl p-4">

            <h2 className="font-bold text-lg mb-3">
              Related Videos
            </h2>

            {/* Placeholder for future related videos */}
            <p className="text-gray-500">
              Add related videos later
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}