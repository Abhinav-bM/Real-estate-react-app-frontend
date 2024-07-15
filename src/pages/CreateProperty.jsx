import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import axios from "../axiosConfig";
import {addProperty} from "../store/reducers/propertyReducer"

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null); // State to hold file object

  const user = useSelector((state) => state.auth.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("type", type);
    formData.append("image", image);

    try {
      await axios.post("/api/properties/createProperty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response)=>{
        dispatch(addProperty(response.data));
        navigate("/properties")
      })
      console.log("Property added successfully!");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the file object when input changes
  };

  if (!user || user.role !== "agent") {
    return <p>You are not authorized to add properties.</p>;
  }

  return (
    < >
      <Nav />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mt-8 text-center">Add Property</h1>
        <div className="mt-8 mx-2">
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
              <label className="block text-gray-700">Image URL</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mt-4 mb-4"
            >
              Add Property
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProperty;
