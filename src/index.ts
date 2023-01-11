import { useState } from "react"

export const useTest = () => {
  const [state, setState] = useState("test");

  return {state,  setState}
}