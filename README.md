```bash
deno run --watch --allow-net main.ts
deno lint main.ts
deno fmt
```

[Official Manual](https://deno.land/manual)


## Notes:
Tl;Dr; - everything is generally explicit, no implicit behaviors

- should enable Deno LSP for vscode separately _per workspace_ (see `./.vscode/settings.json`)

### Runtime

see [permissions](https://deno.land/manual@v1.11.0/getting_started/permissions)
    - specific network domain [allow lists](https://deno.land/manual@v1.11.0/getting_started/permissions#network-access): 

### TypeScript
- use [--no-check](https://deno.land/manual@v1.11.5/typescript/overview#type-checking) to skip TS checking at runtime
- need to manually specify `.d.ts` files, if any (see [here](https://deno.land/manual@v1.11.5/typescript/types#types-and-type-declarations))
- manually specify `tsconfig.json` location, not implied
- [caveats](https://deno.land/manual@v1.11.5/typescript/faqs#why-are-you-forcing-me-to-use-isolated-modules-why-can#39t-i-use-const-enums-with-deno-why-do-i-need-to-do-export-type)

### Deps

- [integry checking](https://deno.land/manual@v1.11.5/linking_to_external_code/integrity_checking)
- cache can be [reloaded](https://deno.land/manual@v1.11.5/linking_to_external_code/reloading_modules)
- import [aliases mapping](https://deno.land/manual@v1.11.5/linking_to_external_code/import_maps#import-maps)


### Standard Lib

Deno's native fetch [doesn't support cookies](https://deno.land/manual@v1.11.0/runtime/web_platform_apis#spec-deviations) b/c has no cookie jar
Deno's HTTP events impl [does not bubble up](https://deno.land/manual@v1.11.0/runtime/web_platform_apis#spec-deviations) b/c no tree

Deno HTTP server - [pretty low level](https://deno.land/manual@v1.11.0/runtime/http_server_apis)

testing lib - https://deno.land/manual@v1.11.5/testing/assertions