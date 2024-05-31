import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://i.ibb.co/r27Gj76/blood-and-bleeding.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Save a Life, Donate Blood</h1>
          <p className="py-6">
            Learn how your blood donation can help people in need, including
            those undergoing surgeries, battling illnesses, and experiencing
            accidents.
          </p>
          <div className="space-x-8">
            <button
              onClick={() => navigate("/register")}
              className="btn btn-primary"
            >
              Join as a donor
            </button>
            <button
              onClick={() => navigate("/search")}
              className="btn btn-primary"
            >
              Search Donors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
