pipeline {
    agent any

    environment {
        BASE_URL = 'https://automationintesting.online'
        CI = 'true'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Check Node.js and npm Versions') {
            steps {
                bat '''
node --version
npm --version
'''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Chromium') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Chromium Playwright Tests') {
            steps {
                bat 'npm run test:ci'
            }
        }
    }

    post {
        always {
            junit testResults: 'test-results/junit.xml', allowEmptyResults: true
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
    }
}
