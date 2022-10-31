# syntax=docker/dockerfile:1.4
FROM rust:buster AS base

ENV USER=root

WORKDIR /code
RUN cargo init
COPY Cargo.toml /code/Cargo.toml
RUN cargo fetch
COPY . /code

FROM base AS development

RUN cargo install cargo-watch
CMD [ "cargo", "watch", "--poll", "-x run" ]

FROM base AS dev-envs

RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "cargo", "run", "--offline" ]

FROM base AS builder

RUN cargo build --release --offline

FROM debian:buster-slim

COPY --from=builder /code/target/release/elephant /elephant

CMD [ "/elephant" ]