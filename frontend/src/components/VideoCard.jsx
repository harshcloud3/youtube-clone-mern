// Import Link for video navigation
// Improved video card responsiveness
import { Link } from 'react-router-dom';

// Import user profile icon
import { FaUserCircle } from 'react-icons/fa';


// ========================= VIDEO CARD COMPONENT =========================
// Added reusable component improvements
export default function VideoCard({ video }) {

  return (

    // Navigate to video player page on click
    <Link to={`/video/${video._id}`}>

      {/* Video card container */}
      <div className="cursor-pointer">

        {/* Video thumbnail */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-xl"
        />


        {/* Video information section */}
        <div className="flex gap-3 mt-3">

          {/* Channel/User icon */}
          <FaUserCircle className="text-4xl text-gray-500" />


          <div>

            {/* Video title */}
            <h3 className="font-semibold line-clamp-2">
              {video.title}
            </h3>


            {/* Video uploader/channel name */}
            <p className="text-sm text-gray-600 mt-1">
              {video.uploader}
            </p>


            {/* Video views count */}
            <p className="text-sm text-gray-500">
              {video.views} views
            </p>

          </div>
        </div>
      </div>
    </Link>
  );
}