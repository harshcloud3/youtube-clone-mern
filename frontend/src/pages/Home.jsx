// Import React hooks
import {
  useEffect,
  useState
} from 'react';

// Import URL search params hook
import { useSearchParams } from 'react-router-dom';

// Import axios for API requests
import axios from 'axios';

// Import reusable video card component
import VideoCard from '../components/VideoCard';


// ========================= VIDEO CATEGORIES =========================
const categories = [
  'All',
  'Education',
  'Music',
  'Gaming',
  'Sports',
  'Comedy',
  'News'
];


// ========================= HOME PAGE COMPONENT =========================
export default function Home() {

  // Store all videos from backend
  const [videos, setVideos] = useState([]);

  // Store filtered videos
  const [filteredVideos, setFilteredVideos] = useState([]);

  // Store selected category
  const [selectedCategory, setSelectedCategory] =
    useState('All');

  // Manage URL query parameters
  const [searchParams, setSearchParams] =
    useSearchParams();

  // Get category from URL
  const categoryFromUrl =
    searchParams.get('category');

  // Get search query from URL
  const searchQuery =
    searchParams.get('search') || '';


  // ========================= FETCH VIDEOS =========================
  useEffect(() => {

    // Fetch all videos from backend
    axios.get(
      `${import.meta.env.VITE_API_URL}/videos`
    )
    .then(res => setVideos(res.data));

  }, []);


  // ========================= APPLY CATEGORY FROM URL =========================
  useEffect(() => {

    // If category exists in URL
    if (categoryFromUrl) {

      // Update selected category
      setSelectedCategory(categoryFromUrl);

    } else {

      // Default category
      setSelectedCategory('All');
    }

  }, [categoryFromUrl]);


  // ========================= FILTER VIDEOS =========================
  useEffect(() => {

    // Create copy of videos array
    let filtered = [...videos];


    // Filter by category
    if (selectedCategory !== 'All') {

      filtered = filtered.filter(
        v => v.category === selectedCategory
      );
    }


    // Filter by search query
    if (searchQuery) {

      filtered = filtered.filter(v =>
        v.title
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          )
      );
    }


    // Store filtered videos
    setFilteredVideos(filtered);

  }, [
    videos,
    selectedCategory,
    searchQuery
  ]);


  // ========================= COMPONENT UI =========================
  return (
    <div className="pt-20 px-4">

      {/* ========================= CATEGORY FILTER BUTTONS ========================= */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">

        {/* Loop through all categories */}
        {categories.map(cat => (

          <button
            key={cat}

            // Change selected category
            onClick={() => {

              // Update selected category state
              setSelectedCategory(cat);

              // Remove URL query params
              setSearchParams({});
            }}

            // Dynamic active/inactive button styling
            className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-black text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >

            {/* Category name */}
            {cat}

          </button>
        ))}
      </div>


      {/* ========================= VIDEOS GRID ========================= */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {/* Loop through filtered videos */}
        {filteredVideos.map(video => (

          // Render reusable video card
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}

      </div>
    </div>
  );
}