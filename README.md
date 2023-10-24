# Attendance Project
## Tutorial for running the webpage locally using vscode
- You must have nodejs installed https://nodejs.org/en
- Clone the project from the github dev branch
- Open the project folder in vscode `project-group-generic-application`
- Open a new terminal in vscode and run `npm install`, then run `npm run dev`
- Your website should now be running locally (follow the link in the terminal to see it)

(this website will auto update using vite, so any changes you make will automatically show up without you having to re-run the terminal command)

## How to build the website
- Open the project in vscode, and run the command `npm run build`
- This will build the website within the `project-group-generic-application\dist` folder
- Optionally but highly recommended to run `npm run preview` to preview the website using the dist files that were just created
- You can now upload the website onto cheshire by deleting the existing `index.html` and `assets` folders if they exist, then move the files from `dist` onto cheshire
