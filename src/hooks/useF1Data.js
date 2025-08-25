import { useState, useEffect, useCallback } from 'react';

const useF1Data = () => {
  const [f1Data, setF1Data] = useState({ races: [], driverStandings: [], constructorStandings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchF1Data = useCallback(async () => {
    try {
      const [racesRes, driverStandingsRes, constructorStandingsRes] = await Promise.all([
        fetch('https://api.jolpi.ca/ergast/f1/2025/races.json'),
        fetch('https://api.jolpi.ca/ergast/f1/2025/driverStandings.json'),
        fetch('https://api.jolpi.ca/ergast/f1/2025/constructorStandings.json'),
      ]);

      if (!racesRes.ok || !driverStandingsRes.ok || !constructorStandingsRes.ok) {
        throw new Error('Network response was not ok');
      }

      const racesData = await racesRes.json();
      const driverStandingsData = await driverStandingsRes.json();
      const constructorStandingsData = await constructorStandingsRes.json();

      setF1Data({
        races: racesData.MRData.RaceTable.Races,
        driverStandings: driverStandingsData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [],
        constructorStandings: constructorStandingsData.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [],
      });
    } catch (err) {
      console.error("Error fetching F1 data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchF1Data();
  }, [fetchF1Data]);

  return { f1Data, loading, error };
};

export default useF1Data;