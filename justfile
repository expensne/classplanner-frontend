set dotenv-load

install:
    npm install .

run:
    npm run dev

build:
    npm run build

publish:
    scp -r -i $SSH_ID dist/ $SSH_DST:~/
    ssh -i $SSH_ID $SSH_DST -t "sudo rm -rf /var/www/html/class.fabiangrosch.de && sudo sudo mv ./dist /var/www/html/class.fabiangrosch.de"
