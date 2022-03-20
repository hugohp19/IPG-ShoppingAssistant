in Client => package.json, change the following line:

for Production:

"proxy": {
  "/api": {
    "target": "http://localhost:8080"
  }
}

for development:

"proxy": "http://localhost:8080"