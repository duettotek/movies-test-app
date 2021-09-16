# Getting Started with run yarn

yarn

[1/4] 🔍 Resolving packages...
[2/4] 🚚 Fetching packages...
[3/4] 🔗 Linking dependencies...
warning " > @testing-library/user-event@12.8.3" has unmet peer dependency "@testing-library/dom@>=7.21.4".
warning " > react-moment@1.1.1" has unmet peer dependency "prop-types@^15.7.0".
warning " > relay-hooks@5.0.0" has incorrect peer dependency "relay-runtime@^10.1.0 || ^11.0.0".
warning " > graphql-compiler@1.7.0" has incorrect peer dependency "graphql@^0.13.0".
[4/4] 🔨 Building fresh packages...
✨ Done in 42.60s.

# Generate Relay files

yarn relay

yarn run v1.22.11
$ relay-compiler --language typescript --extensions ts tsx

Writing ts
Created:

- MovieDetailsQuery.graphql.ts
- MovieList_query.graphql.ts
- MovieItem_movie.graphql.ts
- AppQuery.graphql.ts
  Unchanged: 0 files
  ✨ Done in 1.54s.
  ➜ movies-test-app git:(main) ✗

# Modify MoveList_query.graphql.ts, I don't know why but compiler cant resolvs types (maybe a bug I need more time to fix it)

10 readonly backdrop: string;
11 readonly releaseDate: Date;

instead of

10 readonly backdrop: unknown | null;
11 readonly releaseDate: unknown | null;

# run application

yarn start
