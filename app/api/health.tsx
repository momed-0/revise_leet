export let isGoServiceHealthy = false;

export async function checkGoServiceHealth() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/health`);
    if (response.ok) {
      isGoServiceHealthy = true;
    } else {
      isGoServiceHealthy = false;
    }
  } catch (error) {
    console.error("Go service health check failed:", error);
    isGoServiceHealthy = false;
  }
}

// Call the health check periodically (e.g., every 15 minutes)
setInterval(checkGoServiceHealth, 60000*15);
checkGoServiceHealth()