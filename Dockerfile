# syntax=docker/dockerfile:1.4
FROM node:lts AS development

ENV CI=''

WORKDIR /traveler

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Fetch all node modules purely based on the pnpm lock file.
COPY pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
  pnpm fetch

# Copy the entire workspace into the scope and start the actual build.
COPY . .
RUN pnpm install --recursive --frozen-lockfile

# Notes:
#
# We should be pruning the store after `pnpm fetch`. But currently, that wipes the entire store which kinda defeats
# the whole point. Is that a bug?
#
# We are manually specificying `--frozen-lockfile` in the `install` steps because we don't have the `CI=true` environment
# variable set. That is, because with `CI=true` set, the `pnpm deploy` command also internally seemingly forces the
# `--frozen-lockfile` behavior (which makes no sense, imho[?!]) and therefore breaks the command (errors out).

CMD [ "pnpm", "run", "dev" ]

FROM development AS builder

RUN pnpm run build
