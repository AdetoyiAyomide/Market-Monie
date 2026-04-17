/**
 * Service to handle Nigerian state and LGA data fetching
 * Caching is handled by TanStack Query
 */

export const locationService = {
  /**
   * Fetches all Nigerian states
   */
  async getLocations() {
    try {
      const response = await fetch("https://nga-states-lga.onrender.com/fetch");
      if (!response.ok) throw new Error("Failed to fetch locations");
      return await response.json();
    } catch (error) {
      console.error("Location API Error:", error);
      // Fallback data in case API is offline
      return [
        { state: "Lagos", lgas: ["Ikeja", "Alimosho", "Lagos Island", "Ikorodu", "Surulere"] },
        { state: "Abuja", lgas: ["Garki", "Wuse", "Asokoro", "Maitama", "Gwarinpa"] },
        { state: "Ogun", lgas: ["Abeokuta South", "Abeokuta North", "Ijebu Ode", "Sagamu"] }
      ];
    }
  },

  /**
   * Helper to get just the list of state names
   */
  async getStates() {
    const locations = await this.getLocations();
    return locations.map(l => typeof l === 'string' ? l : (l.state || l.name));
  },

  /**
   * Helper to get LGAs for a specific state
   */
  async getLGAs(stateName) {
    if (!stateName) return [];
    
    try {
      const response = await fetch(`https://nga-states-lga.onrender.com/?state=${stateName}`);
      if (!response.ok) throw new Error("Failed to fetch LGAs");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error("Invalid LGA data");
    } catch (error) {
      console.error("LGA API Error:", error);
      const locations = await this.getLocations();
      const stateData = locations.find(l => typeof l !== 'string' && (l.state || l.name) === stateName);
      return stateData ? stateData.lgas : [];
    }
  }
};
