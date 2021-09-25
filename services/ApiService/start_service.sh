#!/bin/bash
./ApiService.exe &
envoy -c /etc/api-envoy.yaml