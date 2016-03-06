ssh root@pittfagan.com << EOF
	  cd /var/www/pittfagan.com/
	  git reset --hard HEAD
	  git fetch --all
	  git checkout master
	  git pull
    npm install
    pm2 restart index
EOF
