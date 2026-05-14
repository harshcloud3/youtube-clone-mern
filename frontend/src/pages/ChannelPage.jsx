// Import React hooks
import { useEffect, useState } from 'react';

// Import axios for API requests
import axios from 'axios';

// Import authentication context
import { useAuth } from '../context/AuthContext';

// Import navigation hook
import { useNavigate } from 'react-router-dom';


// ========================= CHANNEL PAGE COMPONENT =========================
export default function ChannelPage() {

  // Get logged-in user and logout function
  const { user, logout } = useAuth();

  // Store current channel data
  const [channel, setChannel] = useState(null);

  // Store uploaded videos list
  const [videos, setVideos] = useState([]);

  // Create channel form state
  const [channelForm, setChannelForm] = useState({
    channelName: '',
    description: ''
  });

  // Upload video form state
  const [videoForm, setVideoForm] = useState({
    videoId: '',
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    category: 'Education'
  });

  // Store currently editing video
  const [editingVideo, setEditingVideo] = useState(null);

  // React Router navigation
  const navigate = useNavigate();


  // ========================= FETCH CHANNEL AND VIDEOS =========================
  const fetchChannelAndVideos = async () => {
    try {

      // Fetch logged-in user's channel
      const channelRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/channels/owner`
      );

      // Store channel data
      setChannel(channelRes.data);

      // Fetch videos of current channel
      const videosRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/videos/channel/${channelRes.data._id}`
      );

      // Store videos list
      setVideos(videosRes.data);

    } catch (err) {

      // If channel does not exist
      if (err.response?.status === 404)
        setChannel(null);
    }
  };


  // ========================= CHECK AUTHENTICATION =========================
  useEffect(() => {

    // Redirect to login if user not logged in
    if (!user)
      navigate('/login');

    // Fetch channel and videos if user exists
    else
      fetchChannelAndVideos();

  }, [user]);


  // ========================= CREATE CHANNEL =========================
  const createChannel = async (e) => {

    // Prevent page refresh
    e.preventDefault();

    // Send create channel request
    await axios.post(
      `${import.meta.env.VITE_API_URL}/channels`,
      channelForm
    );

    // Refresh data
    fetchChannelAndVideos();
  };


  // ========================= UPLOAD VIDEO =========================
  const uploadVideo = async (e) => {

    // Prevent page refresh
    e.preventDefault();

    // Send upload video request
    await axios.post(
      `${import.meta.env.VITE_API_URL}/videos`,
      {
        ...videoForm,
        channelId: channel._id,
        uploader: user.username
      }
    );

    // Reset form after upload
    setVideoForm({
      videoId: '',
      title: '',
      description: '',
      thumbnailUrl: '',
      videoUrl: '',
      category: 'Education'
    });

    // Refresh videos list
    fetchChannelAndVideos();
  };


  // ========================= UPDATE VIDEO =========================
  const updateVideo = async (id) => {

    // Send update request
    await axios.put(
      `${import.meta.env.VITE_API_URL}/videos/${id}`,
      editingVideo
    );

    // Exit edit mode
    setEditingVideo(null);

    // Refresh videos list
    fetchChannelAndVideos();
  };


  // ========================= DELETE VIDEO =========================
  const deleteVideo = async (id) => {

    // Send delete request
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/videos/${id}`
    );

    // Refresh videos list
    fetchChannelAndVideos();
  };


  // Prevent rendering before authentication
  if (!user)
    return null;

// Updated channel management interface
  // ========================= COMPONENT UI =========================
  return (
    <div className="pt-20 p-4 max-w-5xl mx-auto">

      {/* ========================= CREATE CHANNEL SECTION ========================= */}
      {!channel ? (

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-2xl font-bold">
            Create your channel
          </h2>

          {/* Create channel form */}
          <form
            onSubmit={createChannel}
            className="mt-4 space-y-3"
          >

            {/* Channel name input */}
            <input
              type="text"
              placeholder="Channel Name"
              value={channelForm.channelName}
              onChange={e =>
                setChannelForm({
                  ...channelForm,
                  channelName: e.target.value
                })
              }
              className="w-full border p-2"
              required
            />

            {/* Channel description input */}
            <textarea
              placeholder="Description"
              value={channelForm.description}
              onChange={e =>
                setChannelForm({
                  ...channelForm,
                  description: e.target.value
                })
              }
              className="w-full border p-2"
            ></textarea>

            {/* Create channel button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create Channel
            </button>

          </form>
        </div>

      ) : (

        <>
          {/* ========================= CHANNEL INFO ========================= */}
          <div className="bg-gray-100 p-4 rounded mb-6">

            {/* Channel name */}
            <h1 className="text-3xl font-bold">
              {channel.channelName}
            </h1>

            {/* Channel description */}
            <p>{channel.description}</p>

          </div>


          {/* ========================= UPLOAD VIDEO SECTION ========================= */}
          <div className="bg-white p-4 rounded shadow mb-6">

            <h2 className="text-xl font-bold mb-2">
              Upload New Video
            </h2>

            {/* Upload video form */}
            <form
              onSubmit={uploadVideo}
              className="grid gap-3"
            >

              {/* Video ID */}
              <input
                placeholder="Video ID"
                value={videoForm.videoId}
                onChange={e =>
                  setVideoForm({
                    ...videoForm,
                    videoId: e.target.value
                  })
                }
                required
              />

              {/* Video title */}
              <input
                placeholder="Title"
                value={videoForm.title}
                onChange={e =>
                  setVideoForm({
                    ...videoForm,
                    title: e.target.value
                  })
                }
                required
              />

              {/* Video description */}
              <textarea
                placeholder="Description"
                value={videoForm.description}
                onChange={e =>
                  setVideoForm({
                    ...videoForm,
                    description: e.target.value
                  })
                }
              ></textarea>

              {/* Thumbnail URL */}
              <input
                placeholder="Thumbnail URL"
                value={videoForm.thumbnailUrl}
                onChange={e =>
                  setVideoForm({
                    ...videoForm,
                    thumbnailUrl: e.target.value
                  })
                }
                required
              />

              {/* Video URL */}
              <input
                placeholder="Video URL"
                value={videoForm.videoUrl}
                onChange={e =>
                  setVideoForm({
                    ...videoForm,
                    videoUrl: e.target.value
                  })
                }
                required
              />

              {/* Video category */}
              <select
                value={videoForm.category}
                onChange={e =>
                  setVideoForm({
                    ...videoForm,
                    category: e.target.value
                  })
                }
              >
                <option>Education</option>
                <option>Music</option>
                <option>Gaming</option>
                <option>Sports</option>
                <option>Comedy</option>
                <option>News</option>
              </select>

              {/* Upload button */}
              <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded"
              >
                Upload
              </button>

            </form>
          </div>


          {/* ========================= MY VIDEOS SECTION ========================= */}
          <h2 className="text-xl font-bold mb-2">
            My Videos
          </h2>

          <div className="grid gap-4">

            {/* Loop through videos */}
            {videos.map(v => (

              <div
                key={v._id}
                className="border p-4 rounded flex justify-between items-center"
              >

                {/* ========================= EDIT VIDEO MODE ========================= */}
                {editingVideo &&
                editingVideo._id === v._id ? (

                  <div className="max-w-3xl space-y-4 bg-gray-50 p-5 rounded-2xl border">

                    {/* Title field */}
                    <div>

                      <label className="block font-semibold text-gray-700 mb-1">
                        Title
                      </label>

                      <input
                        value={editingVideo.title}
                        onChange={e =>
                          setEditingVideo({
                            ...editingVideo,
                            title: e.target.value
                          })
                        }
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Video Title"
                      />
                    </div>


                    {/* Description field */}
                    <div>

                      <label className="block font-semibold text-gray-700 mb-1">
                        Description
                      </label>

                      <textarea
                        value={editingVideo.description}
                        onChange={e =>
                          setEditingVideo({
                            ...editingVideo,
                            description: e.target.value
                          })
                        }
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Video Description"
                        rows="4"
                      />
                    </div>


                    {/* Category field */}
                    <div>

                      <label className="block font-semibold text-gray-700 mb-1">
                        Category
                      </label>

                      <select
                        value={editingVideo.category}
                        onChange={e =>
                          setEditingVideo({
                            ...editingVideo,
                            category: e.target.value
                          })
                        }
                        className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option>Education</option>
                        <option>Music</option>
                        <option>Gaming</option>
                        <option>Sports</option>
                        <option>Comedy</option>
                        <option>News</option>
                      </select>
                    </div>


                    {/* Action buttons */}
                    <div className="flex gap-3">

                      {/* Save button */}
                      <button
                        onClick={() =>
                          updateVideo(v._id)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
                      >
                        Save
                      </button>

                      {/* Cancel button */}
                      <button
                        onClick={() =>
                          setEditingVideo(null)
                        }
                        className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-xl transition"
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                ) : (

                  <>
                    {/* ========================= VIDEO INFO ========================= */}
                    <div>

                      {/* Video title */}
                      <h3 className="font-bold">
                        {v.title}
                      </h3>

                      {/* Video metadata */}
                      <p className="text-sm text-gray-600">
                        {v.category} • {v.views} views
                      </p>

                    </div>


                    {/* ========================= ACTION BUTTONS ========================= */}
                    <div className="flex gap-2">

                      {/* Edit button */}
                      <button
                        onClick={() =>
                          setEditingVideo(v)
                        }
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() =>
                          deleteVideo(v._id)
                        }
                        className="text-red-600"
                      >
                        Delete
                      </button>

                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}