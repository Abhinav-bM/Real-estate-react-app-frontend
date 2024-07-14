import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav/Nav";
import axios from "../axiosConfig";
import { deleteProperty } from "../store/reducers/propertyReducer";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/properties/${id}`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.error("Error fetching property details:", error);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`/api/properties/${id}`)
      .then((response) => {
        console.log("Property deleted successfully:", response.data);
        if (response.status === 200) {
          dispatch(deleteProperty(id));
          navigate("/properties");
        }
      })
      .catch((error) => {
        console.error("Error deleting property:", error);
      });
  };

  const handleEdit = () =>{
    navigate(`/properties/${id}/edit`);
  }

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {property.image && (
              <div className="md:flex-shrink-0">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover md:w-64"
                />
              </div>
            )}
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
              <p className="text-gray-700 mb-4">
                Description : {property.description}
              </p>
              <p className="text-xl font-semibold mb-4">
                Price : ₹ {property.price}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Location: {property.location}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Type: {property.type}
              </p>
              {user.role === "agent" && (
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
