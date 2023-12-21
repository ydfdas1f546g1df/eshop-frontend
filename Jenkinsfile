pipeline {
    environment {
        ProjectURL = "registry.gitlab.internal.kuelling-sh.com:443"
        ProjectPush = 'registry.gitlab.internal.kuelling-sh.com:443/webshop/frontend'
        DeployCreds = credentials('deployFrontend')
    }

    agent {
        label 'docker'
    }

    stages {
        stage('Clear Workspace') {
            steps {
                // Delete the workspace before running any other steps
                deleteDir()
            }
        }   
        stage('Prepare'){
            steps{
                checkout scmGit(
                    branches: [[name: '*/master']], 
                    extensions: [],
                    userRemoteConfigs: [
                        [   
                            credentialsId: 'git',
                            url: 'git@gitlab.internal.kuelling-sh.com:webshop/frontend.git'
                        ]
                    ]
                )
            }
        }

        stage('Build-Code') {
            agent {
                docker {
                    image 'node:21.4.0-alpine'
                    label 'docker'
                    args '-v ${PWD}:/workspace -w /workspace'
                    reuseNode true
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build-Container') {
            steps {
                script{
                    docker.build("${ProjectPush}:${env.BUILD_ID}")
                }
            }
        }

        stage('Publish') {
            steps{
                sh 'echo ${TokDeployCreds_PSW} | docker login -u ${TokDeployCreds_USR} --password-stdin'
                echo 'Login Completed' 
                sh 'docker push ${ProjectPush}:$BUILD_NUMBER'                   
            }
        }
    }
    post{
        always{
            sh 'docker logout'
        }
    }
}