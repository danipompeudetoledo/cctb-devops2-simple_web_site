pipeline {
  agent any

  environment {
    REPO_URL         = 'https://github.com/danipompeudetoledo/cctb-devops2-simple_web_site.git'
    TESTING_SERVER   = '54.87.136.54'
    PRODUCTION_SERVER= '54.89.47.2'
    TEST_RESULT_FILE = 'test_result.txt'
  }

  stages {

    stage('Build (install test deps)') {
      steps {
        sh '''
          node -v
          npm -v
          rm -f package.json package-lock.json || true
          npm init -y
          npm install selenium-webdriver chromedriver
          export PATH="$PATH:./node_modules/.bin"
          chromedriver --version || true
        '''
      }
    }

    stage('Deploy to Testing') {
      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh',
                                           keyFileVariable: 'SSH_KEY',
                                           usernameVariable: 'SSH_USER')]) {
          sh """
            ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ec2-user@$TESTING_SERVER \\
              'sudo dnf install -y git && sudo rm -rf /var/www/html/* && \\
               sudo git clone $REPO_URL /var/www/html'
          """
        }
      }
    }

    stage('Run Selenium Tests') {
      steps {
        script {
          try {
            sh '''
              export PATH="$PATH:./node_modules/.bin"
              node selenium-tests/test_form.js
              node selenium-tests/test_validation.js
            '''
            writeFile file: env.TEST_RESULT_FILE, text: 'true'
          } catch (err) {
            writeFile file: env.TEST_RESULT_FILE, text: 'false'
            error("Tests failed: ${err}")
          }
        }
      }
    }

    stage('Deploy to Production') {
      when { expression { readFile(env.TEST_RESULT_FILE).trim() == 'true' } }
      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh',
                                           keyFileVariable: 'SSH_KEY',
                                           usernameVariable: 'SSH_USER')]) {
          sh """
            ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ec2-user@$PRODUCTION_SERVER \\
              'sudo dnf install -y git && sudo rm -rf /var/www/html/* && \\
               sudo git clone $REPO_URL /var/www/html'
          """
        }
      }
    }
  }
}

