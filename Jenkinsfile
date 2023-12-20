pipeline {
    environment {
        $ProjectURL = "registry.gitlab.internal.kuelling-sh.com:443"
        $ProjectPush = 'registry.gitlab.internal.kuelling-sh.com:443/webshop/frontend'
        $DocekrUser = 'gitlab+deploy-token-1'
        $Token = ''
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
            script {
                    docker.withRegistry("$ProjectURL", "$DockerUser", "$Token") {
                        docker.image("$ProjectPush").push()
                    }
                }
        }
        }
    }
