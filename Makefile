install:
	deno cache --reload --lock=lock.json ./src/deps.ts
dev:
	deno run --watch --allow-net --allow-read --allow-write ./src/main.ts
lint:
	deno lint /src/main.ts
fmt:
	deno fmt
