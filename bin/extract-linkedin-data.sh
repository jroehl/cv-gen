#!/usr/bin/env bash

EXPORT_DIR="${1}"

function extract_data() {
  python3 -c 'import csv, json, sys; print(json.dumps([dict(r) for r in csv.DictReader(sys.stdin)]))' <"$1"
}

echo "Parsing ${EXPORT_DIR}/Projects.csv"
extract_data "$EXPORT_DIR/Projects.csv" | jq '[.[] | {title: .Title, duration: "\(."Started On") - \(if ."Finished On" != "" then ."Finished On" else "Present" end)", text: .Description}]'
printf "\n\n"

echo "Parsing ${EXPORT_DIR}/Skills.csv"
extract_data "$EXPORT_DIR/Skills.csv" | jq '{value: [.[].Name] | sort}'
printf "\n\n"

echo "Parsing ${EXPORT_DIR}/Profile.csv"
extract_data "$EXPORT_DIR/Profile.csv" | jq '.[] | {
  name: "\(."First Name") \(."Last Name") (née \(."Maiden Name"))", 
  location: ."Geo Location", 
  websites: ."Websites", 
  headline: ."Headline",
  summary: ."Summary"
}'
