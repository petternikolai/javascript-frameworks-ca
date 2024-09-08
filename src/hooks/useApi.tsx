import { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json: T = await response.json();
        setData(json);
      } catch (error) {
        console.error("Fetching error:", error);
        setError((error as Error).message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url]);

  return { data, isLoading, error };
}

export default useApi;

// EXAMPLE USAGE
// import React from 'react';
// import useApi from './useApi';

// function ExampleComponent() {
//   const { data, isLoading, error } = useApi('https://api.example.com/data');

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Data from API</h1>
//       <ul>
//         {data.map(item => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ExampleComponent;
