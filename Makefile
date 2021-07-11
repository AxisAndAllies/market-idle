install:
	deno cache --reload --lock=lock.json deps.ts
dev:
	deno run --allow-net --allow-read --allow-write main.ts
lint:
	deno lint main.ts
fmt:
	deno fmt
