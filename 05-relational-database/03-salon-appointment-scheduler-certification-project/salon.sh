#!/bin/bash

# Program for managing salon service appoointments

PSQL="psql -X --username=freecodecamp --dbname=salon --no-align --tuples-only -c"

echo -e "\n~~~~~ Salon de Lune ~~~~~\n"
echo -e "Welcome to Salon de Lune \u2014 where elegance meets perfection.\n"

SERVICE() {
  while true
  do
    echo -e "Indulge yourself \u2014 choose a service below."
    echo "1) Haircut"
    echo "2) Hair Coloring"
    echo "3) Hair Wash & Blow-Dry"
    echo "4) Manicure"
    echo "5) Pedicure"
    echo "6) Facial Treatment"
    echo "7) Face Mask / Peeling"
    echo "8) Back & Shoulder Massage"
    echo "9) Scalp Massage"
    echo "10) Eyebrow Shaping"

    read SERVICE_ID_SELECTED

    case $SERVICE_ID_SELECTED in
      1|2|3|4|5|6|7|8|9|10)
      HANDLE_SERVICE "$SERVICE_ID_SELECTED"
      break
      ;;
    *) echo -e "\nI could not find that service. Please enter a valid option (0-10).\n" ;;
    esac
  done
}

HANDLE_SERVICE() {
  SERVICE_ID_SELECTED=$1
  # get service
  SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")

  # ask for phone number
  echo -e "\nMay I have your phone number?"
  read CUSTOMER_PHONE

  # get customer id
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")

  # get customer name
  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")

  # if not found
  if [[ -z "$CUSTOMER_ID" ]]
  then
    echo -e "\nLooks like you're not in our system yet \u2014 let's fix that!\nWhat's your name?"
    read CUSTOMER_NAME

    # insert into customers
    INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")

    # get customer id
    CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
  fi

  # ask for appointment time
  echo -e "\nWhen would you like your $SERVICE_NAME appointment, $CUSTOMER_NAME?"
  read SERVICE_TIME

  # insert into appoinments
  INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")

  # ending message
  echo -e "I have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
}

SERVICE
