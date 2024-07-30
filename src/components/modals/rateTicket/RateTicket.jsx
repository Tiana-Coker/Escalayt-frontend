import React from "react";
import { useState, useRef } from "react";

// the ticket to be rated id is going to be comming from the user ticket detail
// for now i will hard code the ticket id base on the db
const RateTicket = ({onClose, ticketId}) => {
  const [rating, setRating] = useState(0);

  const reviewText = useRef();

  
  const url = `${ticketId}serer`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorge Or
    // // const token = sessionStorage.getItem("jwtToken"); // Retrieve the token from sessionStorage

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiJdLCJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MjIzMTUwMDYsImV4cCI6MTcyMjQwMTQwNn0.6J_HLwVUiOhiivAx6WpUsm6_KVrRFNrlf-6G_NRnGKk"

    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    const theRateing = {
      rating: rating,
      review: reviewText.current.value,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/ticket/${ticketId}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(theRateing),
        }
      );

      if (response.ok) {
        console.log("Ticket Rated created successfully");
      } else {
        alert("Error Rating ticket");
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      alert("Error rating ticket from catch");
    }

    console.log("submited");
    console.log(theRateing.rating);
    console.log(theRateing.review);

    setRating(0);
    reviewText.current.value = "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        

        <RatingStar rating={rating} setRating={setRating} />

        <label>
          Review
          <input type="text" ref={reviewText} />
        </label>

        <SubmitReview />
      </form>
    </div>
  );
};

export default RateTicket;

// rating the ticket
function RatingStar({ rating, setRating }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, index) => {
        return (
          <span
            className="no_select"
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: "35px",
            }}
            key={index}
            onClick={() =>
              setRating((prev) => {
                return prev !== star ? star : 0;
              })
            }
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}

// subimit  button

function SubmitReview() {
  return (
    <>
      <div className="bg-custom-blue p-4 rounded h-[44px] w-[400px] flex items-center justify-center mt-10">
        <button type="submit" className="text-white text-md-semibold">
          Submit Review
        </button>
      </div>
    </>
  );
}
