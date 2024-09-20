#!/bin/bash

echo "Waiting for LocalStack..."
until curl -s http://localhost:4566/health | grep "\"s3\": \"running\""; do
  sleep 1
done
echo "LocalStack ready"

export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1
export AWS_ENDPOINT_URL=http://localhost:4566

BUCKET_NAME=local-bucket

echo "Creating S3 bucket: $BUCKET_NAME"
aws --endpoint-url=$AWS_ENDPOINT_URL s3 mb s3://$BUCKET_NAME

# (Opcional) Agregar objetos iniciales
# echo "Agregando un objeto de ejemplo al bucket."
# echo "Contenido de ejemplo" | aws --endpoint-url=$AWS_ENDPOINT_URL s3 cp - s3://$BUCKET_NAME/ejemplo.txt
