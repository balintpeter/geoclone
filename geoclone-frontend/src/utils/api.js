export const getHighScores = async () => {
  try {
    const response = await fetch(
      "https://5wug09o963.execute-api.eu-central-1.amazonaws.com/prod/highscore"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
