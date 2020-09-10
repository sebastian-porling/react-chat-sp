#!/usr/bin/env node
const { main } = require("."),
    port = process.env.PORT || 3000;

main(port);
