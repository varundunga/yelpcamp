pipeline {
    agent any
    options { timestamps(); timeout(time: 1, unit: 'MINUTES')
    stages {
        stage('build') {
            
            steps {
                echo 'building with latest git commit'
                sh 'echo $GIT_COMMIT'
                sh 'echo $GIT_BRANCH'
                sh 'docker build -t test .'
            }
        }
        stage('test'){
            
            steps{
                echo 'building and running tests on nodeserver'
                sh 'docker run test npm run test'
                echo 'building and running tests on nodeserver+mongodb'
                sh 'docker-compose -f test.yml up --build'


            }
        }
    }
     post {
        always {
            // Always cleanup after the build.
            
            sh 'docker-compose -f test.yml down'
            sh 'rm .env'
        }
    }
}