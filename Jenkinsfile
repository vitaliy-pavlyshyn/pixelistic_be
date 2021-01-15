pipeline {
    tools {
        nodejs 'node-default'
    }  
    agent {label 'slave-machine'}
    
    stages {
        stage('Clone repository') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']],
                doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], 
                userRemoteConfigs: [[url: 'http://10.26.0.196/v_pavlyshyn/pixelistic_be.git']]])
            }
        }
        stage('Startup') {
            steps {
               sh 'echo "Startup is done"' 
            }
        }
        stage('Test') {
            steps {
               sh 'echo "All tests is done"'                       
            }
        }
        stage('Build') {
            steps {
                    sh 'docker build '
                }
            }
        }
        // stage('SonarScanner') {
        //     environment {
        //         SONAR = credentials('sonarqube-pixelistic')
        //     }
        //     steps {
        //         withSonarQubeEnv(installationName: 'Sonar') {
        //             sh 'docker run --rm -e SONAR_HOST_URL="http://10.26.0.126:9000/sonarqube" -e SONAR_LOGIN=$SONAR -v ${pwd}:/usr/src sonarsource/sonar-scanner-cli'
        //         }
        //     }
        // }
        stage('Nexus Deploy') {
            steps {
                sh 'docker push'
            }
        }
        // stage('Production') {
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'pixel-prod', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
        //             sh 'sshpass -p "$PASSWORD" scp -oStrictHostKeyChecking=no ./production.yml $USERNAME@10.26.3.158:/'
        //         }
        //     }
        // }
    }
    post {
      failure {
        updateGitlabCommitStatus name: 'build', state: 'failed'
      }
      success {
        updateGitlabCommitStatus name: 'build', state: 'success'
      }
    }
}