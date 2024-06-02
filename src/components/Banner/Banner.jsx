import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://i.ibb.co/r27Gj76/blood-and-bleeding.jpg"
          className="max-w-xs md:max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold text-center md:text-start">
            Save a Life, Donate Blood
          </h1>
          <p className="py-6 text-center md:text-start">
            Learn how your blood donation can help people in need, including
            those undergoing surgeries, battling illnesses, and experiencing
            accidents.
          </p>
          <div className="space-x-8 text-center md:text-start">
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
