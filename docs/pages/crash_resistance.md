---
title: Crash resistance
description: Part of the Cherry documentation
---

# Crash resistance

Some writers like `duckdb` are **naturally crash-resistant** because writes run inside a transaction.

**Other writers** are naturally crash-resistant as long as there is only one output table. If there are multiple
output tables, you can utilize the `anchor_table` parameter to implement crash-resistance.

Output tables are written in parallel for performance but the `anchor_table` is always written last. So you can prune the
non-anchor tables at startup from the output database and start from max_block of anchor_table (see [restarting from where you left off section](/restart_from_block))

