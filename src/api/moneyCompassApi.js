export async function fetchRecommendation(data) {
  try {
    const response = await fetch('http://localhost:5004/api/money-compass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Netzwerkantwort war nicht ok');
    }

    const result = await response.json();
    
    if (!result || !result.recommendation) {
      throw new Error('Leider konnte ich keine passende Empfehlung für dich generieren. Bitte versuche es noch einmal oder ändere deine Eingaben.');
    }
    
    return result;
  } catch (error) {
    if (error.message.includes('Leider konnte ich')) {
      throw error;
    }
    throw new Error('Etwas ist bei der Erstellung deiner Empfehlung schiefgelaufen. Bitte versuche es später noch einmal.');
  }
}