import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTMDBDetails, fetchOMDBDetails } from "../services/details";

const DetailPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      let data = await fetchTMDBDetails(id);
      if (!data) {
        data = await fetchOMDBDetails(id);
      }
      setDetails(data);
    };
    loadDetails();
  }, [id]);

  if (!details) return <p>Loading...</p>;

  return (
    <div className="detail-page">
      <h1>{details.title || details.name || details.Title}</h1>
      <img src={details.image} alt="poster" />
      <p><strong>Plot:</strong> {details.overview || details.Plot}</p>
      <p><strong>Release Date:</strong> {details.release_date || details.Released}</p>
      <p><strong>Ratings:</strong> {JSON.stringify(details.ratings)}</p>
      <p><strong>Cast:</strong> {details.cast?.join(", ") || "N/A"}</p>
    </div>
  );
};

export default DetailPage;
