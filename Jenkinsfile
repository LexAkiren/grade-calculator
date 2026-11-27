pipeline {
    agent any
    tools { nodejs 'NodeJS-22' }
    options { copyArtifactPermission('CD-Grade-Calculator') }
    environment {
        NO_COLOR = '1'
        SCANNER_HOME = tool 'SonarScanner'
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install and Test') {
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }
        stage('Coverage') {
            steps { sh 'npm run test:coverage' }
        }
        stage('SonarQube Analysis') {
            when { branch 'main' }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }
        stage('Quality Gate') {
            when { branch 'main' }
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Build') {
            when { anyOf { branch 'develop'; branch 'main' } }
            steps { sh 'npm run build' }
        }
        stage('Archive Artifact') {
            when { branch 'main' }
            steps {
                sh "tar -czf react-app-${env.BUILD_NUMBER}.tar.gz dist Dockerfile"
                archiveArtifacts artifacts: "react-app-${env.BUILD_NUMBER}.tar.gz", fingerprint: true
            }
        }
    }
}
