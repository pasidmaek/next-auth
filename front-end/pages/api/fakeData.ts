// pages/api/fakeData.ts

import { NextApiRequest, NextApiResponse } from "next";

interface FakeData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const fakeData: FakeData[] = [
  // ... Your original data here
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.headers.accept?.includes("text/html")) {
      // If accessed directly in the browser, return an empty response (for HTML requests)
      return res.status(200).json([]);
    }

    // If accessed through a fetch request or other means, return the actual data
    try {
      // Simulate some delay to show loading state in frontend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace this with your real API endpoint
      const realAPIResponse = await fetch("https://fakestoreapi.com/products");
      const realAPIData: FakeData[] = await realAPIResponse.json();

      // Here, you can manipulate the data or add any additional logic if needed
      // For example, you can modify the response or create fake data based on the real API data

      // Respond with the modified or fake data in JSON format
      return res.status(200).json(realAPIData);
    } catch (error) {
      console.error("Error fetching real API data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // For other HTTP methods, return a 404 Not Found
  return res.status(404).json({ error: "Not Found" });
}
