import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const GuessNumberGame = () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [correct, setCorrect] = useState(false);

  const handleGuess = () => {
    const userGuess = parseInt(guess);

    if (isNaN(userGuess)) {
      setMessage('Please enter a valid number.');
      return;
    }

    if (userGuess < 1 || userGuess > 10) {
      setMessage('Your guess must be between 1 and 10.');
    } else if (userGuess === randomNumber) {
      setMessage(`Correct! The number was ${randomNumber}.`);
      setCorrect(true);
    } else if (userGuess < randomNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
  };

  const handleRestart = () => {
    setGuess('');
    setMessage('');
    setCorrect(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
        <h1>Guess the Number (1-10)</h1>
      {!correct ? (
        <>
          <TextField
            label="Guess the Number"

            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            type="number"
            margin="normal"
          />
          <Button variant="contained" onClick={handleGuess}>
            Guess
          </Button>
        </>
      ) : (
        <Button variant="contained" onClick={handleRestart}>
          Play Again
        </Button>
      )}
      {message && (
        <Typography variant="h6" color="textSecondary" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default GuessNumberGame;
