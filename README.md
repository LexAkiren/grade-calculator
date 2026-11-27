# Grade Calculator: React CI/CD with Jenkins

A React (Vite) grade calculator used for the SQE Final Project. It shows a full CI/CD flow: Jenkins Multibranch CI, SonarQube quality gate, a versioned build artifact, and a parameterized CD pipeline that deploys the artifact to Docker.

## Repository contents

| File | Purpose |
|------|---------|
| src/ | React source and tests (grades.js, App.jsx, *.test.js, *.test.jsx) |
| package.json, package-lock.json | Dependencies and scripts |
| Jenkinsfile | CI pipeline (Multibranch) |
| Jenkinsfile.cd | CD pipeline (parameterized) |
| Dockerfile | nginx image that serves the built app |
| sonar-project.properties | SonarQube configuration |

## Run the app locally

    npm ci
    npm run dev        # development server
    npm test           # run tests
    npm run test:coverage   # tests with LCOV coverage in coverage/lcov.info
    npm run build      # production build in dist/

## Git branches

- main: production-ready code
- develop: integration branch
- feature/<name>: feature work, merged by pull request

## CI pipeline (Jenkinsfile)

Jenkins job: CI-Grade-Calculator (Multibranch Pipeline, Git source, scan every 2 minutes).

| Stage | feature/* | develop | main |
|-------|-----------|---------|------|
| Checkout | yes | yes | yes |
| Install and Test | yes | yes | yes |
| Coverage | yes | yes | yes |
| SonarQube Analysis | no | no | yes |
| Quality Gate (80% overall coverage) | no | no | yes |
| Build | no | yes | yes |
| Archive Artifact | no | no | yes |

The main branch archives react-app-N.tar.gz (N is the build number). It contains dist/ and the Dockerfile and does not contain node_modules.

## CD pipeline (Jenkinsfile.cd)

Jenkins job: CD-Grade-Calculator (Pipeline from this script). Parameters:

- CI_BUILD_NUMBER: build number of CI-Grade-Calculator/main
- ENVIRONMENT: DEV, TEST, ACC or PROD

The job copies react-app-N.tar.gz from the main CI job, extracts it, builds a Docker image from the Dockerfile inside the artifact, and starts a container. It prints the selected build number and environment. It does not run npm run build.

| Environment | Container | Port |
|-------------|-----------|------|
| DEV | grade-dev | 8081 |
| TEST | grade-test | 8082 |
| ACC | grade-acc | 8083 |
| PROD | grade-prod | 8084 |

## Setup

1. Install Docker Desktop (WSL2).
2. Run Jenkins and SonarQube with Docker Compose. Jenkins is built from an image that adds the Docker CLI and mounts /var/run/docker.sock so it can control the host Docker. Jenkins is on port 8090 and SonarQube on port 9000. For
@'
# Grade Calculator: React CI/CD with Jenkins

A React (Vite) grade calculator used for the SQE Final Project. It shows a full CI/CD flow: Jenkins Multibranch CI, SonarQube quality gate, a versioned build artifact, and a parameterized CD pipeline that deploys the artifact to Docker.

## Repository contents

| File | Purpose |
|------|---------|
| src/ | React source and tests (grades.js, App.jsx, *.test.js, *.test.jsx) |
| package.json, package-lock.json | Dependencies and scripts |
| Jenkinsfile | CI pipeline (Multibranch) |
| Jenkinsfile.cd | CD pipeline (parameterized) |
| Dockerfile | nginx image that serves the built app |
| sonar-project.properties | SonarQube configuration |

## Run the app locally

    npm ci
    npm run dev        # development server
    npm test           # run tests
    npm run test:coverage   # tests with LCOV coverage in coverage/lcov.info
    npm run build      # production build in dist/

## Git branches

- main: production-ready code
- develop: integration branch
- feature/<name>: feature work, merged by pull request

## CI pipeline (Jenkinsfile)

Jenkins job: CI-Grade-Calculator (Multibranch Pipeline, Git source, scan every 2 minutes).

| Stage | feature/* | develop | main |
|-------|-----------|---------|------|
| Checkout | yes | yes | yes |
| Install and Test | yes | yes | yes |
| Coverage | yes | yes | yes |
| SonarQube Analysis | no | no | yes |
| Quality Gate (80% overall coverage) | no | no | yes |
| Build | no | yes | yes |
| Archive Artifact | no | no | yes |

The main branch archives react-app-N.tar.gz (N is the build number). It contains dist/ and the Dockerfile and does not contain node_modules.

## CD pipeline (Jenkinsfile.cd)

Jenkins job: CD-Grade-Calculator (Pipeline from this script). Parameters:

- CI_BUILD_NUMBER: build number of CI-Grade-Calculator/main
- ENVIRONMENT: DEV, TEST, ACC or PROD

The job copies react-app-N.tar.gz from the main CI job, extracts it, builds a Docker image from the Dockerfile inside the artifact, and starts a container. It prints the selected build number and environment. It does not run npm run build.

| Environment | Container | Port |
|-------------|-----------|------|
| DEV | grade-dev | 8081 |
| TEST | grade-test | 8082 |
| ACC | grade-acc | 8083 |
| PROD | grade-prod | 8084 |

## Setup

1. Install Docker Desktop (WSL2).
2. Run Jenkins and SonarQube with Docker Compose. Jenkins is built from an image that adds the Docker CLI and mounts /var/run/docker.sock so it can control the host Docker. Jenkins is on port 8090 and SonarQube on port 9000. For a private Docker host set SONAR_VALIDATEWEBHOOKS to false on the SonarQube service.
3. In Jenkins install these plugins: Pipeline, Git, NodeJS, SonarQube Scanner, Copy Artifact.
4. Jenkins tools: NodeJS named NodeJS-22 (22.x), SonarQube Scanner named SonarScanner.
5. Jenkins credentials: a Secret text credential named sonar-token holding a SonarQube token (not stored in this repo).
6. Jenkins system settings: SonarQube server named SonarQube at http://sonarqube:9000 using sonar-token.
7. SonarQube: create the project grade-calculator, a quality gate with an Overall Code condition Coverage is less than 80, and a webhook to http://jenkins-final:8080/sonarqube-webhook/.
8. Create the multibranch job CI-Grade-Calculator pointing at this repository, and the pipeline job CD-Grade-Calculator using Jenkinsfile.cd.

## Quality gate

Main fails if overall coverage is below 80 percent. sonar.exclusions removes test files from analysis so coverage is measured only on application code.

## Security

npm audit reports 0 vulnerabilities at the time of the final run.
