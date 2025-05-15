"use client";

import { useState, useEffect } from "react";

export default function useElectricityData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Replace this with actual API call
      const response = await fetch("/api/electricity-data");
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return data;
}
