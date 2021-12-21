FROM golang:1.17.4

# install libxml2
WORKDIR /libxml
RUN curl -L ftp://xmlsoft.org/libxml2/LATEST_LIBXML2 -o ./LIBXML2_LATEST.tar.gz && \
  tar -xf ./LIBXML2_LATEST.tar.gz && \
  cd ./libxml2* && \
  ./configure --prefix=/usr  --enable-static --with-threads --with-history && \
  make && \
  make install

# build app
WORKDIR /app
COPY schema schema
COPY go.mod .
COPY go.sum .
COPY main.go .
RUN go build

# run app
CMD [ "/app/musicxmlvalidator" ]