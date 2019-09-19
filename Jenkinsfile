pipeline {
    agent {label 'docker'}
    stages {
        stage('build') {
            steps {
                echo 'building with latest git commit'
                echo $GIT_COMMIT
                echo $GIT_BRANCH
                sh 'docker build -t test .'
            }
        }
        stage('test'){
            steps{
                echo 'building and running tests on nodeserver'
                sh 'docker run test'
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