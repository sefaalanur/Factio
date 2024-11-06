import { useEffect, useState } from "react";
import FactCard from "../components/FactCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Facts() {
  const [facts, setFacts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacts = async () => {
      const res = await fetch("/api/fact/getFacts");
      const data = await res.json();
      setFacts(data.facts);
    };
    fetchFacts();
  }, []);

  const handleLike = async (factId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/fact/likeFact/${factId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setFacts(
          facts.map((fact) =>
            fact._id === factId
              ? {
                  ...fact,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : fact
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Quick Facts: Discover Something New in Seconds!</h1>
      <p className="text-md text-gray-500">
        Here, I share bite-sized, fascinating facts that you can enjoy anytime,
        perfect for a quick dose of inspiration or a spark of curiosity! From
        quirky science insights and historical surprises to little-known travel
        tips, these fast facts are designed to keep you intrigued and informed
        in seconds. Dive in and see what catches your eye!
      </p>
      {facts.map((fact) => (
        <FactCard key={fact._id} fact={fact} onLike={handleLike} />
      ))}
    </div>
  );
}
