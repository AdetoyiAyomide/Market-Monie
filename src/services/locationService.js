import { stateLgaMapping } from "../store/LgaData";

/**
 * Service to handle Nigerian state and LGA data fetching
 */
export const locationService = {
  /**
   * Fetches all Nigerian states
   */
  async getLocations() {
    // Return the local mapping as it is comprehensive and fast
    return Object.keys(stateLgaMapping).map(state => ({
      state,
      lgas: stateLgaMapping[state]
    }));
  },

  /**
   * Helper to get just the list of state names
   */
  async getStates() {
    return Object.keys(stateLgaMapping).sort();
  },

  /**
   * Helper to get LGAs for a specific state
   */
  async getLGAs(stateName) {
    if (!stateName) return [];
    
    // Prioritize the local mapping for speed and reliability
    const lgas = stateLgaMapping[stateName];
    if (lgas) return lgas;

    // Fallback for cases like "FCT (Abuja)" vs "Abuja" if they differ in the input
    const normalizedName = stateName.includes("Abuja") ? "FCT (Abuja)" : stateName;
    return stateLgaMapping[normalizedName] || [];
  }
};
