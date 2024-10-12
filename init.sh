#!/bin/bash
set -e      # Exit immediately if a command exits with a non-zero status

echo "Starting initialization script..."

echo "Waiting for LocalStack to be ready..."
until curl -s http://localhost:4566/_localstack/health | grep "\"s3\": \"available\""; do
  sleep 1
done
echo "LocalStack is ready."

# Export AWS environment variables
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_REGION=us-east-1
export AWS_ENDPOINT_URL=http://localhost:4566

# Verify environment variables are set
echo "AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID"
echo "AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY"
echo "AWS_REGION: $AWS_REGION"
echo "AWS_ENDPOINT_URL: $AWS_ENDPOINT_URL"

BUCKET_NAME=local-bucket

echo "Creating S3 bucket: $BUCKET_NAME"
aws --endpoint-url=$AWS_ENDPOINT_URL s3 mb s3://$BUCKET_NAME --region $AWS_REGION

echo "S3 bucket created successfully."

# (Optional) Add initial objects
# echo "Adding a sample object to the bucket."
# echo "Sample content" | aws --endpoint-url=$AWS_ENDPOINT_URL s3 cp - s3://$BUCKET_NAME/sample.txt

echo "Initialization script completed successfully."
