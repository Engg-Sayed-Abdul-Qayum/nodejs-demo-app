# Node.js Demo App - GitHub Actions CI/CD

This project completes 
**DevOps Internship Task 1:** 
**Automate Code Deployment Using CI/CD Pipeline (GitHub Actions)**.

## Objective
Build and automate a sample Node.js web application using GitHub Actions and Docker. 
Every push to `main` runs tests first; when tests pass, GitHub Actions builds the Docker image and pushes it to Docker Hub.

## Tools
- GitHub
- GitHub Actions
- Node.js 20
- Docker
- Docker Hub

## Project structure
```text
nodejs-demo-app/
├── .github/
│   └── workflows/
│       └── main.yml
├── src/
│   └── server.js
├── test/
│   └── server.test.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
└── README.md
```

## Run locally
```bash
npm install
npm test
npm start
```

Open `http://localhost:3000`.

Health check:
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{"status":"ok"}
```

## Run with Docker
Build:
```bash
docker build -t nodejs-demo-app .
```

Run:
```bash
docker run --rm -p 3000:3000 nodejs-demo-app
```

Open `http://localhost:3000`.

## GitHub Actions CI/CD flow
```text
Developer pushes code to main
          ↓
     GitHub Actions
          ↓
      Checkout code
          ↓
      Setup Node.js
          ↓
      npm ci + tests
          ↓
       Tests pass?
       ↙        ↘
     No          Yes
     ↓             ↓
   Stop      Docker build
                   ↓
            Docker Hub login
                   ↓
              Docker push
```

The workflow is stored in `.github/workflows/main.yml` and follows the assignment requirement to automate **test → build → push**.

## Docker Hub secrets
In the GitHub repository, add these repository secrets:

- `DOCKERHUB_USERNAME` = your Docker Hub username
- `DOCKERHUB_TOKEN` = a Docker Hub access token

Do not put passwords or access tokens directly in the YAML file.

## Docker Hub repository
Create a Docker Hub repository named:
```text
nodejs-demo-app
```

The workflow publishes:
```text
<DOCKERHUB_USERNAME>/nodejs-demo-app:latest
<DOCKERHUB_USERNAME>/nodejs-demo-app:<git-commit-sha>
```

## Interview questions

### 1. What is CI/CD?
**CI (Continuous Integration)** automatically builds and tests code changes. 
**CD (Continuous Delivery/Deployment)** automates the process of preparing or deploying validated changes.

### 2. How do GitHub Actions work?
GitHub Actions executes workflows defined in YAML files under `.github/workflows/`. Events such as a push trigger jobs, and jobs run on GitHub-hosted or self-hosted runners.

### 3. What are runners?
Runners are machines that execute GitHub Actions jobs. This project uses the GitHub-hosted `ubuntu-latest` runner.

### 4. Difference between jobs and steps
A **job** is a group of steps that runs on a runner. A **step** is an individual action or command inside a job.

### 5. How do you secure secrets in GitHub Actions?
Store credentials such as Docker Hub tokens in GitHub repository/environment secrets and reference them with `${{ secrets.NAME }}`. Never hard-code credentials in source code or workflow files.

### 6. How do you handle deployment errors?
Check the failed workflow step and logs, reproduce the problem locally, fix the issue, run tests, and push a corrected commit. Keeping test and deployment stages separate also prevents an unsuccessful test run from reaching the Docker push stage.

### 7. Explain the Docker build-push workflow
After tests pass, GitHub Actions checks out the code, configures Docker Buildx, authenticates to Docker Hub using secrets, builds the image from the Dockerfile, and pushes tagged images to Docker Hub.

### 8. How can you test a CI/CD pipeline locally?
Run the same application commands locally (`npm ci`, `npm test`, and `docker build`) and use Docker to validate the resulting image. GitHub Actions-specific behavior still needs to be verified by a workflow run.

## Submission checklist
- [x] Sample Node.js application
- [x] Automated tests
- [x] Dockerfile
- [x] GitHub Actions workflow
- [x] Test → build → push pipeline
- [x] Docker Hub secret configuration documented
- [x] README with implementation and interview questions
