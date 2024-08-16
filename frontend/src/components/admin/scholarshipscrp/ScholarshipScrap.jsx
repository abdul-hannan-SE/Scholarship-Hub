import React, { useEffect, useState } from "react";
import "./ScholarshipScrap.css";

const ScholarshipScrapcard = () => {
  const [allPrograms, setAllPrograms] = useState([]);
  const [openPrograms, setOpenPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from both APIs
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch("http://localhost:2000/data/applicationOpen"),
          fetch("http://localhost:2000/data"),
        ]);

        if (!response1.ok || !response2.ok) {
          throw new Error("Network response was not ok");
        }

        const result1 = await response1.json();
        const result2 = await response2.json();

        setOpenPrograms(result1.data);
        setAllPrograms(result2.data);
        setLoading(false); // Set loading to false after both data sets are fetched
      } catch (error) {
        console.error("Error fetching data from API", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="blog-card-container">
      {loading ? (
        <div className="loadingF">Scholarship Fetching...</div>
      ) : (
        <>
          <h2 className="title">Programs in which application is opened</h2>
          <div className="programs-container">
            {openPrograms.length > 0 ? (
              openPrograms.map((val) => (
                <div className="blog-card shadow" key={val.id}>
                  <div className="img-scrap">
                    <img src={val.imgSrc} alt={val.title} />
                  </div>
                  <div className="text">
                    <h3>{val.title}</h3>
                    <div className="admin flex">
                      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
                        <strong>Type:</strong>
                        <br />
                        {val.type}
                      </div>
                      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
                        <strong>Category:</strong>
                        <br />
                        {val.category}
                      </div>
                      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
                        <strong>Area:</strong>
                        <br />
                        {val.area}
                      </div>
                      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
                        <strong>Deadline:</strong>
                        <br />
                        {val.deadline}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No open programs available</div>
            )}
          </div>

          <h2 className="title">All Programs</h2>
          <div className="programs-container">
            {allPrograms.length > 0 ? (
              allPrograms.map((val) => (
                <div className="blog-card shadow" key={val.id}>
                  <div className="img-scrap">
                    <img src={val.imgSrc} alt={val.title} />
                  </div>
                  <div className="text">
                    <h3>{val.title}</h3>
                    <div className="admin flex">
                      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
                        <strong>Type:</strong>
                        <br />
                        {val.type}
                      </div>
                      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
                        <strong>Category:</strong>
                        <br />
                        {val.category}
                      </div>
                      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
                        <strong>Area:</strong>
                        <br />
                        {val.area}
                      </div>
                      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
                        <strong>Deadline:</strong>
                        <br />
                        {val.deadline}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No programs available</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ScholarshipScrapcard;
