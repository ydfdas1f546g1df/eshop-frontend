pipeline {
    environment {
        ProjectURL = "registry.gitlab.internal.kuelling-sh.com:443"
        ProjectPush = 'registry.gitlab.internal.kuelling-sh.com:443/webshop/frontend'
        DockerUser = 'gitlab+deploy-token-2'
        Token = 'nj1aSsNWRUFyWGd6p4Ua'
    }

    agent none

    stages {
        stage('Prepare') {
            agent {
                docker {
                    image 'node:21.4.0-alpine'
                    label 'docker'
        }}
            steps {
                npm 'install'
                npm 'build'
            }
            }
        stage('Build') {
            agent any
            options {
                retry(0)
            }
            steps {
                docker 'build -t $ProjectPush .'
            }
        }
        stage('Deploy') {
            agent any
            options {
            }
            steps{
                script {
                    docker.withRegistry("$ProjectURL", "$DockerUser", "$Token") {
                        docker.image("$ProjectPush").push()
                    }
                }
            }
        }
        }
    }
