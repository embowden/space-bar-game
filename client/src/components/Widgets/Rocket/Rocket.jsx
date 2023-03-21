import { useLottie } from "lottie-react";
import discoverRocket from "../../../assets/lotties/rocket-only.json";

const Rocket = () => {
  
  const options = {
    animationData: discoverRocket,
    loop: true,
    autoplay: true,
  };
  const { View } = useLottie(options);
  return View;
};

export default Rocket;
