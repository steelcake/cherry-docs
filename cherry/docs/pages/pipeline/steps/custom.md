---
title: Writing Custom Steps
description: Guide to creating custom pipeline steps
---

# Writing Custom Steps

Cherry ETL allows you to create custom steps to modify data in any way you need. This guide explains how to create and use custom steps.

## Step Interface

Custom steps must implement the `Step` interface:

```python
from typing import Any
from cherry_etl.step import Step

class CustomStep(Step):
    def __init__(self, config: Any):
        self.config = config
        
    def process(self, tables: dict[str, Any]) -> dict[str, Any]:
        # Modify tables here
        return tables
```

## Example Custom Step

Here's an example of a custom step that adds a new column to a table:

```python
from dataclasses import dataclass
from typing import Optional
from cherry_etl.step import Step

@dataclass
class AddColumnConfig:
    tables: Optional[list[str]] = None
    column_name: str
    value: Any

class AddColumn(Step):
    def __init__(self, config: AddColumnConfig):
        self.config = config
        
    def process(self, tables: dict[str, Any]) -> dict[str, Any]:
        target_tables = self.config.tables or tables.keys()
        
        for table_name in target_tables:
            if table_name in tables:
                table = tables[table_name]
                table[self.config.column_name] = self.config.value
                
        return tables
```

## Using Custom Steps

To use a custom step in your pipeline:

```python
from cherry_etl import config as cc

# Create custom step config
config = AddColumnConfig(
    tables=["transactions"],
    column_name="is_processed",
    value=False
)

# Add step to pipeline
step = cc.Step(
    kind=cc.StepKind.CUSTOM,
    config=config,
    step_class=AddColumn
)
```

## Best Practices

1. Use dataclasses for step configuration to ensure type safety
2. Document your step's purpose and configuration options
3. Handle missing tables gracefully
4. Preserve existing data unless explicitly modifying it
5. Return the modified tables dictionary
6. Use type hints for better code maintainability 