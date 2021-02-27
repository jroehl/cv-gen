#!/usr/bin/env bash

function email_to_hash {
    echo -n $1 | tr '[A-Z]' '[a-z]' | md5
}

JSON_FILE="${1}"

FILENAME=$(basename -- "${JSON_FILE}")
extension="${FILENAME##*.}"
FILENAME="${FILENAME%.*}"

TITLE="Curriculum Vitae - $(cat ${JSON_FILE} | jq -r '.contact.name')"
DESCRIPTION=$(cat ${JSON_FILE} | jq -r '.columns.left[] | select( .heading == "About me").values[0].value')
EMAIL=$(cat ${JSON_FILE} | jq -r '.contact.mail')
GRAVATAR_HASH=$(email_to_hash $EMAIL)
OUTPUT_JPG="${FILENAME}.jpg"

# Merge PDF to one JPG
convert +append public/${FILENAME}.pdf public/pdf/${OUTPUT_JPG}

RESULT=$(
  sed -e "s/%TITLE%/${TITLE}/g" \
      -e "s/%DESCRIPTION%/${DESCRIPTION}/g" \
      -e "s/%GRAVATAR_HASH%/${GRAVATAR_HASH}/g" \
      -e "s/%OUTPUT_JPG%/${OUTPUT_JPG}/g" \
      -e "s|%PDF%|${FILENAME}.pdf|g" \
      "public/pdf/index.html"
  )

echo $RESULT > public/pdf/index.html