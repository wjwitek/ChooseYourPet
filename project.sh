#!/bin/bash

function cleanup {
  deactivate > /dev/null 2>&1
}

trap cleanup EXIT

if ! command -v python &> /dev/null
then
  echo "python could not be found"
  exit
fi

case $1 in
  "setup")
    if ! command -v pip &> /dev/null
    then
        echo "python could not be found"
        exit
    fi

    if ! command -v npm &> /dev/null
    then
        echo "python could not be found"
        exit
    fi

    if [ ! -d "./.venv" ]; then
        echo "Creating virtual environment..."
    python -m venv .venv
    fi

    source .venv/bin/activate

    echo "Installing python dependencies..."
    pip install --upgrade pip &> /dev/null
    pip install -r requirements.txt &> /dev/null

    cd ./assets
    echo "Installing npm dependencies..."
    npm install &> /dev/null

    echo "Building React frontend..."
    npm run build &> /dev/null

    echo "Application is ready to run!"
    ;;
  "run")
    source .venv/bin/activate
    python -m flask run
    ;;
  *)
    echo "Invalid option, available: setup, run"
	exit
    ;;
esac
