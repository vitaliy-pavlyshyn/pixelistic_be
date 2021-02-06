pipeline {
    agent any
    environment {
        aws_ecr_pass = credentials("aws_ecr_pass")
    }
    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/vitaliy-pavlyshyn/pixelistic_be.git'
            }
        }
        stage('Build a container') {
            steps {
                withCredentials([string(credentialsId: 'aws_ecr_pass', variable: 'PW')]) {
                    sh "sudo docker login --username AWS --password $PW public.ecr.aws/t0q9r0m9 \
                    && sudo docker build -t pixelistic_be ."
                }
            }
        }
        stage('Push to registry') {
            steps {
                sh "sudo docker tag pixelistic_be:latest public.ecr.aws/t0q9r0m9/pixelistic_be:latest && sudo docker push public.ecr.aws/t0q9r0m9/pixelistic_be:latest"
            }
        }
    }
    post { 
        always { 
            cleanWs()
        }
    }
}