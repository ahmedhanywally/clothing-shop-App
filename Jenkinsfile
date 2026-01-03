pipeline {
    agent any

    environment {
        DOCKERHUB = credentials('dockerhub-creds') // Docker Hub username/password
        GITHUB_REPO = 'https://github.com/ahmedhanywally/clothing-shop-App.git'
        BUILD_NUMBER_TAG = "${BUILD_NUMBER}"
        FRONTEND_IMAGE = "hani111/frontend-app"
        BACKEND_IMAGE  = "hani111/backend-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Checking out repo..."
                git url: "${GITHUB_REPO}", branch: 'main', credentialsId: 'github-token'
            }
        }

        stage('Docker Hub Login') {
            steps {
                echo "Logging in to Docker Hub..."
                bat """
                echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo "Building frontend Docker image..."
                bat """
                docker build -t %FRONTEND_IMAGE%:%BUILD_NUMBER_TAG% ./frontend
                docker tag %FRONTEND_IMAGE%:%BUILD_NUMBER_TAG% %FRONTEND_IMAGE%:latest
                """
            }
        }

        stage('Build Backend Image') {
            steps {
                echo "Building backend Docker image..."
                bat """
                docker build -t %BACKEND_IMAGE%:%BUILD_NUMBER_TAG% ./backend
                docker tag %BACKEND_IMAGE%:%BUILD_NUMBER_TAG% %BACKEND_IMAGE%:latest
                """
            }
        }

        stage('Push Frontend Image') {
            steps {
                echo "Pushing frontend Docker image to Docker Hub..."
                bat """
                docker push %FRONTEND_IMAGE%:%BUILD_NUMBER_TAG%
                docker push %FRONTEND_IMAGE%:latest
                """
            }
        }

        stage('Push Backend Image') {
            steps {
                echo "Pushing backend Docker image to Docker Hub..."
                bat """
                docker push %BACKEND_IMAGE%:%BUILD_NUMBER_TAG%
                docker push %BACKEND_IMAGE%:latest
                """
            }
        }
    }
}