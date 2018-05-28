#!/bin/bash

echo "Building bundle..."

yarn build && \
cd dist && \
aws s3 cp --acl public-read . s3://blocks.lol --recursive && \
cd -