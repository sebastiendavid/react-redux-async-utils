import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

export { mount, shallow } from "enzyme";

process.removeAllListeners("unhandledRejection");
process.on("unhandledRejection", function(error, p) {
  console.log("unhandled rejection, promise:\n", p, "\nerror:\n", error);
});
