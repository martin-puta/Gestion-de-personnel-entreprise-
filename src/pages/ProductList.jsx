import React, { useState } from "react";


const ProductList = () => {
  const [pollOptions, setPollOptions] = useState([
    { id: 1, option: "React", votes: 0 },
    { id: 2, option: "Vue", votes: 0 },
    { id: 3, option: "Angular", votes: 0 },
  ]);
  const [voted, setVoted] = useState(false);

  const handleVote = (id) => {
    if (voted) return;
    setPollOptions((prevOptions) =>
      prevOptions.map((opt) =>
        opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
    setVoted(true);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Vote for Your Favorite Framework</h2>
      {pollOptions.map((option) => (
        <div key={option.id} className="mb-2 p-4">
          <div className="flex justify-between">
            <span>{option.option}</span>
            <button
              disabled={voted}
              onClick={() => handleVote(option.id)}
            >
              Vote ({option.votes})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
