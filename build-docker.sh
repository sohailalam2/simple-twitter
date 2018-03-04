#!/bin/bash

echo ">> >> "
echo ">> >> "
echo ">> >> Building Backend Docker Image"
echo ">> >> "
echo ">> >> "

cd backend
npm install apidoc
apidoc -i src/ -o public/
docker build -t sohailalam2/simple-twitter-backend .
cd ..

echo ">> >> "
echo ">> >> "
echo ">> >> Pushing sohailalam2/simple-twitter-backend"
echo ">> >> "
echo ">> >> "
docker push sohailalam2/simple-twitter-backend

echo ">> >> "
echo ">> >> "
echo ">> >> Building Frontend"
echo ">> >> "
echo ">> >> "
cd frontend
npm install
npm run build

echo ">> >> "
echo ">> >> "
echo ">> >> Building Frontend Docker Image"
echo ">> >> "
echo ">> >> "
docker build -t sohailalam2/simple-twitter-frontend .
cd ..

echo ">> >> "
echo ">> >> "
echo ">> >> Pushing sohailalam2/simple-twitter-frontend"
echo ">> >> "
echo ">> >> "
docker push sohailalam2/simple-twitter-frontend
echo ">> >> "
echo ">> >> "
echo ">> >> Build finished"
