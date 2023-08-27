#!/usr/bin/env bash

JSON_FILE="${1}"

echo "Creating pdf/index.html file"

FILENAME=$(basename -- "${JSON_FILE}")
FILENAME="${FILENAME%.*}"

TITLE="Curriculum Vitae - $(cat ${JSON_FILE} | jq -r '.contact.name')"
DESCRIPTION=$(cat ${JSON_FILE} | jq -r '.columns.left[] | select( .heading == "About me").values[0].value')
EMAIL=$(cat ${JSON_FILE} | jq -r '.contact.mail')
GRAVATAR_HASH=$(curl -s --location --request POST 'https://api.hashify.net/hash/md5/hex' --data-raw "${EMAIL}" | jq -r '.Digest')

OUTPUT_JPG="${FILENAME}.jpg"

# Merge PDF to one JPG
echo "Converting \"public/${FILENAME}.pdf\" to \"public/pdf/${OUTPUT_JPG}\""
convert -density 300 -quality 80 +append public/${FILENAME}.pdf public/pdf/${OUTPUT_JPG}

RESULT=$(
  sed -e "s/%TITLE%/${TITLE}/g" \
    -e "s/%DESCRIPTION%/${DESCRIPTION}/g" \
    -e "s/%GRAVATAR_HASH%/${GRAVATAR_HASH}/g" \
    -e "s/%OUTPUT_JPG%/${OUTPUT_JPG}/g" \
    -e "s|%PDF%|${FILENAME}.pdf|g" \
    "public/pdf/index.template"
)

echo "$RESULT" >public/pdf/index.html
