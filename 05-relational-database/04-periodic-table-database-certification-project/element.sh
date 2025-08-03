#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

# check if there's no argument
if [[ -z "$1" ]]
then
  echo "Please provide an element as an argument."
  exit
fi

# run query
SEARCH_RESULT=$($PSQL "
SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius
FROM elements
LEFT JOIN properties USING(atomic_number)
LEFT JOIN types USING(type_id)
WHERE atomic_number::TEXT = '$1' OR symbol = '$1' OR name = '$1';"
)

# check if there's no element associated with the given argument
if [[ -z "$SEARCH_RESULT" ]]
then
  echo "I could not find that element in the database."
else
  # if there's an element from the database
  echo "$SEARCH_RESULT" | while IFS="|" read -r ATOMIC_NUMBER NAME SYMBOL TYPE ATOMIC_MASS MELTING_POINT_CELSIUS BOILING_POINT_CELSIUS
  do
    echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT_CELSIUS celsius and a boiling point of $BOILING_POINT_CELSIUS celsius."
  done
fi
