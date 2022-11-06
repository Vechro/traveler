# syntax=docker/dockerfile:1.4
FROM node:lts AS development

ENV CI=true

WORKDIR /code
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

COPY package.json /code/package.json
RUN pnpm install --no-frozen-lockfile
COPY . /code

CMD [ "pnpm", "run", "dev" ]

FROM development as dev-envs
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
CMD [ "pnpm", "run", "dev" ]

FROM development AS builder

RUN pnpm run build
