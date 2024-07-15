import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { setProperties } from "../store/reducers/propertyReducer";

const PropertyList = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.properties);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filterByPrice, setFilterByPrice] = useState(null);
  const [showFiltersOnTop, setShowFiltersOnTop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      if (user.role === "agent") {
        axios
          .get(`/api/properties/agent`)
          .then((response) => {
            dispatch(setProperties(response.data));
            setFilteredProperties(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching properties:", error);
            setLoading(false);
          });
      } else {
        axios
          .get(`/api/properties`)
          .then((response) => {
            dispatch(setProperties(response.data));
            setFilteredProperties(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching properties:", error);
            setLoading(false);
          });
      }
    }
  }, [dispatch, user]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterProperties(e.target.value, filterByPrice);
  };

  const handlePriceFilterChange = (e) => {
    const priceRange = e.target.value.split("-");
    
    if (filterByPrice && filterByPrice.join() === priceRange.join()) {
      setFilterByPrice(null);
      filterProperties(searchTerm, null); 
    } else {
      setFilterByPrice(e.target.checked ? priceRange : null);
      filterProperties(searchTerm, e.target.checked ? priceRange : null);
    }
  };

  const filterProperties = (term, priceRange) => {
    let filtered = properties;
    if (term) {
      filtered = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(term.toLowerCase()) ||
          property.location.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (priceRange) {
      filtered = filtered.filter(
        (property) =>
          property.price >= parseInt(priceRange[0], 10) &&
          property.price <= parseInt(priceRange[1], 10)
      );
    }
    setFilteredProperties(filtered);
  };

  const handleClickNewProperty = () => {
    navigate("/createProperty");
  };

  const handlePropertyClick = (id) => {
    navigate(`/properties/${id}`);
  };

  if (!user || loading) {
    return (
      <>
        <Nav />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto px-4 mb-4">
        <h1 className="text-4xl font-bold mt-8 text-center">Properties</h1>

        {user.role === "agent" && (
          <button
            onClick={handleClickNewProperty}
            className=" bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add New Property
          </button>
        )}

        <div className="mt-8">
          {/* Filters section */}
          <div
            className={`lg:flex ${
              showFiltersOnTop ? "flex-col" : "lg:flex-row"
            }`}
          >
            <div
              className={`lg:w-1/4 ${
                showFiltersOnTop ? "mb-4" : ""
              } border border-gray-300 rounded-lg p-4 mr-10 mb-1 min-h-0`}
            >
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Filter by Price:</label>
                <div className="mt-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="priceUnder500k"
                      value="0-500000"
                      onChange={handlePriceFilterChange}
                      className="mr-2"
                    />
                    <label htmlFor="priceUnder500k">Under ₹ 500,000</label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="price500k1m"
                      value="500001-1000000"
                      onChange={handlePriceFilterChange}
                      className="mr-2"
                    />
                    <label htmlFor="price500k1m">₹ 500,001 - ₹ 1,000,000</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Property list section */}
            <div className="lg:w-3/4">
              <div className="flex justify-center mb-4">
                <input
                  type="text"
                  placeholder="Search by property title or location..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div>
                {filteredProperties.length === 0 ? (
                  <p className="text-center">No properties found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProperties.map((property) => (
                      <div
                        key={property._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                        onClick={() => handlePropertyClick(property._id)}
                      >
                        {property.image && (
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-48 object-cover object-center"
                          />
                        )}
                        <div className="p-4">
                          <h2 className="text-xl font-bold">
                            {property.title}
                          </h2>
                          
                          <p className="mt-2">₹ {property.price} </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Location: {property.location}
                          </p>
                          <p className="text-sm text-gray-500">
                            Type: {property.type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyList;
