pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "hani111/clothing-shop-App"
        DOCKER_TAG   = "${BUILD_NUMBER}"
        DOCKERHUB    = credentials('dockerhub-creds') // username/password stored in Jenkins
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ahmedhanywally/clothing-shop-App.git',
                    credentialsId: 'github-token'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% ."
            }
        }

        stage('Docker Login') {
            steps {
                bat "echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin"
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                bat "docker push %DOCKER_IMAGE%:%DOCKER_TAG%"
                bat "docker tag %DOCKER_IMAGE%:%DOCKER_TAG% %DOCKER_IMAGE%:latest"
                bat "docker push %DOCKER_IMAGE%:latest"
            }
        }
    }
}