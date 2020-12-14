import { createContext } from "react";
import Nominees from "./nominees"

const Context = createContext({
  activeNominee: null,
  nominees: Nominees,
});
export default Context;
