# build stage
# syntax=docker/dockerfile:1
FROM golang:stretch AS builder
WORKDIR /go/src/github.com/ddld93/healthApp/users
RUN go get -d -v golang.org/x/net/html  
COPY .    ./
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o authApp .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/github.com/ddld93/healthApp/users/authApp ./
CMD ["./authApp"]  
