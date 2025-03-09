# ImpairAssistWeb
# This is the Frontend Code for the Web Application for Impair Assist 
## To run this code locally 
### 1. Install Dependencies
To install the required dependencies, run the following command:
```
npm install
```
### 2. Run the code to debug
```
npm run dev
```
## To make changes
### 1. Create your own branch
Create your own branch with your name and the prefix "dev-". You can do this by running:
```
git checkout -b dev-your-name
```
### 2. Pull the latest changes from the main branch
Before you start working, ensure that your branch is up-to-date with the main repository. Run the following command to pull the latest changes from the main branch:
```
git checkout main
git pull origin main
```
Then, switch back to your branch:
```
git checkout dev-your-name
```
### 3. Add files and make changes
Make the necessary changes in your project directory. You can add new files, modify existing ones, or delete them as needed.

### 4. Stage your changes
Once you’ve made your changes, add the files to staging with the following command:
```
git add .
```
This will stage all modified and new files. Alternatively, if you want to add specific files, you can use:
```
git add <filename>
```
### 5. Commit your changes
Now, commit your changes with a descriptive message:
```
git commit -m "Describe the changes you've made"
```
### 6. Push your changes to your branch
Once committed, push your changes to your remote branch:
```
git push origin dev-your-name
```
### 7. Create a Pull Request (PR)
Go to the repository on GitHub or GitLab (or your Git hosting platform) and open a Pull Request (PR) from your dev-your-name branch to the main branch. Ensure you provide a clear description of the changes you’ve made.
