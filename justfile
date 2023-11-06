set dotenv-load

install:
    #!/bin/bash
    set -euxo pipefail

    npm install .

run:
    #!/bin/bash
    set -euxo pipefail

    npm run dev

build:
    #!/bin/bash
    set -euxo pipefail

    npm run build

publish: build
    #!/bin/bash
    set -euxo pipefail

    rsync -r -e "ssh -i $SSH_ID" dist/* $SSH_DST:~/frontend-vuejs/
    ssh -i $SSH_ID $SSH_DST -t "sudo rm -rf /var/www/html/cp.dev101.de && sudo sudo mv ~/frontend-vuejs /var/www/html/cp.dev101.de"
