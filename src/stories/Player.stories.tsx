import AnimatedQRPlayer from "../components/AnimatedQRPlayer";
import { URDecoder } from "@ngraveio/bc-ur";

export default {
  name: "Player",
  component: AnimatedQRPlayer
};

export const Player = () => (
  <AnimatedQRPlayer
    data={URDecoder.decode("ur:eth-sign-request/onadtpdagdndcawmgtfrkigrpmndutdnbtkgfssbjnaohdgryagalalnascsgljpnbaelfdibemwaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaelaoxlbjyihjkjyeyaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaehnaehglalalaaxadaaadahtaaddyoeadlecsdwykadykadykaewkadwkaocybgeehfkswdtklffd")}
  />
);
