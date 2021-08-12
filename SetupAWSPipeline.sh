#!/bin/bash
echo "Setting up AWS keys..."
aws configure set aws_access_key_id $PipelineAccessKey
aws configure set aws_secret_access_key $PipelineSecretKey
aws configure set default.region ap-southeast-2
aws configure set region ap-southeast-2
echo "AWS keys configured"
