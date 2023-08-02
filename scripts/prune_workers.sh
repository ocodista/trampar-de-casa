#!/bin/bash

# Specify the directory you want to list folders from
target_directory="apps/workers/"

# Check if the specified directory exists
if [ ! -d "$target_directory" ]; then
  echo "Directory not found: $target_directory"
  exit 1
fi

# Get a list of folder names (excluding the base directory) in the specified directory
folder_names=$(find "$target_directory" -mindepth 1 -maxdepth 1 -type d -printf "%f,")

# Remove the trailing comma from the output
folder_names=${folder_names%,}

# Print the folder names separated by commas
echo "Found folders: $folder_names"

# Iterate over each folder and execute the command
IFS=',' read -ra folders <<< "$folder_names"
for folder in "${folders[@]}"; do
  echo "Running command for folder: $folder"
  turbo prune --scope="${folder}"
  # Replace 'your_command_here' with the actual command you want to run for each folder
  # Example: your_command_here "$target_directory/$folder"
done