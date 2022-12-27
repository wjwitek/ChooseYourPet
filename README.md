# Choose your pet

## Tool for choosing the right pet for you using analytical hierarchy process

### **How to setup for development**

- Make sure you have `python`, `pip` and `npm` installed

- Run in the project directory (requires `sh`), this script will install dependencies, build the project and run the developement server
```bash
sh project.sh setup && sh project.sh run
```
- Access the developement server on http://127.0.0.1:5000

or, if you want to do it manually:

- Create and activate virtual environment with [venv](https://docs.python.org/3/library/venv.html) (and do everything else inside created environment)
- Install dependencies

```bash
pip install -r requirements.txt
```

- Change directory to `assets`, install `npm` packages and build the React app

```bash
cd assets
npm install
npm run build
```

- Run Flask server from the root project directory

```bash
flask run
```
