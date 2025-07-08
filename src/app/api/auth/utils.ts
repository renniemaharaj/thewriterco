import { initialState } from "./config";
import { AuthResult } from "./authTypes";

export function getInitialAuthData(): AuthResult {
  // Check local storage for flow data
  const authData = localStorage.getItem("authData");
  if (authData) {
    return { ...initialState, ...JSON.parse(authData) }; // Use spread operator to combine initial state
  }
  return initialState;
}
