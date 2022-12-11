# Choose your pet

## Tool for choosing the right pet for you using analytical hierarchy process

### **How to setup for development**

- Make sure you have `python3`, `pip` and `npm` installed
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
