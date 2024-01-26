import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const { dataSearch } = location.state ?? {};

  const [listing, setListing] = React.useState(null);
  useEffect(() => {
    setListing(dataSearch);
  }, [dataSearch]);

  return (
    <div className="flex gap-3 p-2">
      <div className="hidden bg-white rounded-lg p-3">
        <h3>Filters</h3>
      </div>
      <div className=" rounded-lg p-3 md:max-w-[800px]   mx-auto">
        {listing && listing?.length > 0 ? (
          listing.map((item) => (
            <div>
              <Link
                to={`/listing/${item?._id}`}
                className="mb-6 bg-white rounded-lg flex gap-5 p-6"
              >
                {item?.images && item?.images.length > 0 && (
                  <div className="flex mb-3">
                    {item.images && item.images.length > 0 && (
                      <img
                        src={item?.images[0]} // Display only the first image
                        alt={`Image for ${item.title}`}
                        className="w-40 h-40  rounded-lg object-cover"
                      />
                    )}
                  </div>
                )}
                <div>
                  <h2>Title: {item?.title}</h2>
                  <p className="text-green-600">Price: ${item?.price}</p>
                  <p>Location: {item?.location}</p>
                  <p>Address: {item?.address}</p>
                </div>
                {/* You can add more details based on your data structure */}
              </Link>
            </div>
          ))
        ) : (
          <p>No listings available.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
