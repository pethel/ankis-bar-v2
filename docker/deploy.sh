#!/usr/bin/env bash
../gradlew build
docker cp ./build/libs/*.jar xp-app:/enonic-xp/home/deploy

