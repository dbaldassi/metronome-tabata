# Metronome App

This is a simple metronome application built with Node.js and a single-page front-end. The application allows users to set a tempo and provides an audible click to help keep time.

## Project Structure

```
metronome-app
├── public
│   ├── index.html        # Main HTML document
│   ├── styles
│   │   └── style.css     # Styles for the webpage
│   └── scripts
│       └── app.js        # JavaScript for metronome functionality
├── src
│   ├── server.js         # Entry point for the Node.js server
│   └── routes
│       └── index.js      # Route definitions for the application
├── package.json          # npm configuration file
├── .gitignore            # Files and directories to ignore by Git
└── README.md             # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd metronome-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the server:**
   ```
   node src/server.js
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to access the metronome application.

## Usage

- Set the desired tempo using the controls provided in the UI.
- Click the start button to begin the metronome.
- Use the stop button to halt the metronome.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.