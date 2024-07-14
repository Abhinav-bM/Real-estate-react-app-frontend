import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Nav from "../components/Nav/Nav";
import axios from "../axiosConfig";
import { updateProperty } from "../store/reducers/propertyReducer";

const EditProperty = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`/api/properties/${id}`)
      .then(response => {
        const property = response.data;
        setTitle(property.title);
        setDescription(property.description);
        setPrice(property.price);
        setLocation(property.location);
        setType(property.type);
        setImage(property.image);
      })
      .catch(error => {
        console.error("Error fetching property details:", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("type", type);
    if (image && typeof image !== 'string') {
      formData.append("image", image);
    }

    try {
      await axios.put(`/api/properties/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch(updateProperty(response.data));
        navigate(`/properties/${id}`);
      });
      console.log("Property updated successfully!");
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mt-8 text-center">Edit Property</h1>
        <div className="mt-8">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              >
                <option value="">Select Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="plot">Plot</option>

              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {image && typeof image === 'string' && (
                <div className="mt-2">
                  <img src={image} alt="Property" className="w-full h-32 object-cover" />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mt-4 mb-4"
            >
              Update Property
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProperty;
