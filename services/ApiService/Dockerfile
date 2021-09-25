FROM golang:1.16.5-alpine3.13 AS builder

# Set necessary environmet variables needed for our image
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Move to working directory /build
WORKDIR /build

# Copy and download dependency using go mod. Version with go download -> COPY . . \ RUN go get -d -v ./... \ RUN go install -v ./...
COPY go.mod go.sum ./
RUN go mod download

# Copy the code into the container
COPY . .

# Build the application
RUN go build -o ApiService.exe

# Move to /dist directory as the place for resulting binary folder
WORKDIR /dist

# Copy binary from build to main folder
RUN cp /build/ApiService.exe .

# Build a small image
FROM envoyproxy/envoy-alpine-dev:latest
COPY --from=builder /dist/ApiService.exe /

COPY start_service.sh /
RUN apk update && apk add bash
RUN chmod u+x /start_service.sh

CMD ["sh", "/start_service.sh"]