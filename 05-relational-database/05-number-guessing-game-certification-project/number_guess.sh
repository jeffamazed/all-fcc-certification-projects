#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

# format query function
FORMAT_QUERY() {
  # format and read query
  IFS="|" read -r USER_ID USERNAME GAMES_PLAYED BEST_GAME <<< $USER_INFO

  USER_ID=$(echo "$USER_ID" | xargs)
  USERNAME=$(echo "$USERNAME" | xargs)
  GAMES_PLAYED=$(echo "$GAMES_PLAYED" | xargs)
  BEST_GAME=$(echo "$BEST_GAME" | xargs)
}

# Generate a random number from 1 - 1000
BIG_RANDOM=$(( RANDOM * 32768 + RANDOM ))
RANDOM_NUMBER=$(( BIG_RANDOM % 1000 + 1 ))

echo "Enter your username:"

read USERNAME

# Check if username is already in db
USER_INFO=$($PSQL "SELECT user_id, username, COALESCE(games_played,0), COALESCE(best_game,0) FROM game_info WHERE username = '$USERNAME';")

if [[ -z "$USER_INFO" ]]
then
  $PSQL "INSERT INTO game_info(username) VALUES('$USERNAME')" > /dev/null
  echo "Welcome, $USERNAME! It looks like this is your first time here."

  # query the user info again for new user
  USER_INFO=$($PSQL "SELECT user_id, username, COALESCE(games_played,0), COALESCE(best_game,0) FROM game_info WHERE username = '$USERNAME';")

  FORMAT_QUERY
else
  FORMAT_QUERY

  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi
echo "Guess the secret number between 1 and 1000:"

TOTAL_ATTEMPTS=0

while true; do
  read GUESSED_NUMBER

  # Check if input is not an integer
  if ! [[ "$GUESSED_NUMBER" =~ ^[0-9]+$ ]]; then
    echo "That is not an integer, guess again:"
    continue
  fi

  (( TOTAL_ATTEMPTS++ ))

  if [[ "$GUESSED_NUMBER" -eq "$RANDOM_NUMBER" ]]; then
    break
  elif [[ "$GUESSED_NUMBER" -gt "$RANDOM_NUMBER" ]]; then
    echo "It's lower than that, guess again:"
  else
    echo "It's higher than that, guess again:"
  fi
done

# update user info db

if [[ "$BEST_GAME" == 0 || "$TOTAL_ATTEMPTS" -lt "$BEST_GAME" ]]
then
  $PSQL "UPDATE game_info SET games_played=COALESCE(games_played, 0) + 1, best_game=$TOTAL_ATTEMPTS WHERE user_id=$USER_ID" > /dev/null
else
  $PSQL "UPDATE game_info SET games_played=COALESCE(games_played, 0) + 1 WHERE user_id=$USER_ID" > /dev/null
fi

# final message
echo "You guessed it in $TOTAL_ATTEMPTS tries. The secret number was $RANDOM_NUMBER. Nice job!"
