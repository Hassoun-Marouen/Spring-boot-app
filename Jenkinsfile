pipeline {
    agent { label 'Dev-Agent' }
    tools {
        jdk 'jdk17'
    }
    
    stages{
        stage('code'){
            steps {
                git url: 'https://github.com/Hassoun-Marouen/Spring-boot-app.git', branch: 'main'
            }
        }
      stage('Install Stage') {
            steps {
                withMaven(maven: 'maven4') {
                    dir('Angular-spring-boot') {  
                        sh 'mvn clean package -DskipTests'
                    }
                }
            }
        }
        stage('Build imageFront'){
            steps {
                sh 'docker build ./digital-banking/ -t houssem52/angular:latest'
            }
        }
             stage('Build imageBack'){
            steps {
                sh 'docker build ./Angular-spring-boot/ -t houssem52/spring:latest'
            }
        }
        stage('Login and Push Image'){
            steps {
                echo 'logging in to docker hub and pushing image..'
                withCredentials([usernamePassword(credentialsId:'DockerHub',passwordVariable:'DockerHubPassword', usernameVariable:'DockerHubUsername')]) {
                    sh "docker login -u ${env.DockerHubUsername} -p ${env.DockerHubPassword}"
                    sh "docker push houssem52/angular:latest"
                    sh "docker push houssem52/spring:latest"
                }    
            }
        }
        stage('Deploy'){
            steps {
                sh 'docker-compose down && docker-compose up -d'
            }
        }
    }
}
