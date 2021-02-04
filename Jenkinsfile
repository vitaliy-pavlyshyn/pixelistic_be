pipeline {
    environment {
    env_vars_be = credentials("env_vars_be")
    aws_ecr_pass = credentials("aws_ecr_pass")
    }

    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/vitaliy-pavlyshyn/pixelistic_be.git'
            }
        }
        stage('Download .env file') {
            steps {
              withCredentials([file(credentialsId: 'env_vars_be', variable: 'envfile-be') {
                    sh "cp \$envfile-be ./.env"
                }
            }
        }
        stage('Build a container') {
            steps {
                withCredentials([string(credentialsId: 'aws_ecr_pass', variable: 'PW')]) {
                    sh 'docker login --username AWS --password \${PW} public.ecr.aws/t0q9r0m9 \
                    && docker build -t pixelistic_be .'                       
            }
        }
        stage('Push to registry') {
            steps {
                    sh 'docker tag pixelistic_be:latest public.ecr.aws/t0q9r0m9/pixelistic_be:latest \ 
                    && docker push public.ecr.aws/t0q9r0m9/pixelistic_be:latest'
                }
            }
        }
    }