pipeline {
    agent any

    environment {
        GITHUB_CRED  = credentials('github-token')    // GitHub PAT stored in Jenkins
        DOCKERHUB    = credentials('dockerhub-creds') // Docker Hub username/password stored in Jenkins
        TEST_REPO    = 'https://github.com/ahmedhanywally/clothing-shop-App.git'
        DOCKER_IMAGE = 'hani111/clothing-shop-app'
    }

    stages {

        stage('Test GitHub Login') {
            steps {
                script {
                    echo "Testing GitHub authentication..."
                    // Use HTTPS with credentials
                    bat "git ls-remote %TEST_REPO%"
                }
            }
        }

        stage('Test Docker Hub Login') {
            steps {
                script {
                    echo "Testing Docker Hub authentication..."
                    // Login using username/password
                    bat """
                    echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin
                    """
                }
            }
        }
    }
}
