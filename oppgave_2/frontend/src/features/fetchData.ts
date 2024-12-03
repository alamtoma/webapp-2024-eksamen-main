export async function fetchData() {
    const response = await fetch('http://localhost:3000/api/data'); // Replace with your backend URL
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }
  