FROM golang:1.17.4

# install libxml2
WORKDIR /libxml
RUN apt-get update && \
  apt-get install -y --no-install-recommends xz-utils=5.2.5-2.1~deb11u1 && \
  rm -rf /var/lib/apt/lists/* && \
  curl -L https://download.gnome.org/sources/libxml2/2.13/libxml2-2.13.8.tar.xz -o ./LIBXML2_LATEST.tar.xz && \
  tar -xf ./LIBXML2_LATEST.tar.xz && \
  cd ./libxml2* && \
  ./configure --prefix=/usr --enable-static --with-threads --with-history --without-python && \
  make && \
  make install

# build app
WORKDIR /server
COPY schema schema
COPY go.mod .
COPY go.sum .
COPY main.go .
RUN go build

# run app
CMD [ "/server/musicxmlvalidator" ]
