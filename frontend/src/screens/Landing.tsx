import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="pt-8 max-w-2xl xl:max-w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img
              src={"/chess-board.webp"}
              className="max-w-50 2xl:max-w-3xl"
              alt="Chess Board"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-8">
            <div>
              <h1 className="text-4xl font-bold uppercase text-white">
                Play Chess Online On The #1 Site!
              </h1>
            </div>

            <div>
              <Button onClick={() => navigate("/game")}>PLAY ONLINE</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
