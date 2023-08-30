#!/usr/bin/env bash


JSON_FILE="${1}"

echo "Creating pdf/index.html file"
mkdir -p "dist/pdf"

FILENAME=$(basename -- "${JSON_FILE}")
FILENAME="${FILENAME%.*}"

TITLE="Curriculum Vitae - $(cat ${JSON_FILE} | jq -r '.contact.name')"
DESCRIPTION=$(cat ${JSON_FILE} | jq -r '.columns.left[] | select( .title == "About me").values[0].value')
EMAIL=$(cat ${JSON_FILE} | jq -r '.contact.mail')
GRAVATAR_HASH=$(curl -s --location --request POST 'https://api.hashify.net/hash/md5/hex' --data-raw "${EMAIL}" | jq -r '.Digest')

OUTPUT_JPG="${FILENAME}.jpg"

# Merge PDF to one JPG
echo "Converting \"dist/${FILENAME}.pdf\" to \"dist/pdf/${OUTPUT_JPG}\""
convert -density 300 -quality 80 +append "dist/${FILENAME}.pdf" "dist/pdf/${OUTPUT_JPG}"

RESULT=$(
  sed -e "s/%TITLE%/${TITLE}/g" \
    -e "s/%DESCRIPTION%/${DESCRIPTION}/g" \
    -e "s/%GRAVATAR_HASH%/${GRAVATAR_HASH}/g" \
    -e "s/%OUTPUT_JPG%/${OUTPUT_JPG}/g" \
    -e "s|%PDF%|${FILENAME}.pdf|g" \
    "src/index.template.html"
)

echo "$RESULT" >dist/pdf/index.html
