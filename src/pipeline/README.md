# Writing Custom Pipelines

There are three components of a pipeline.

- First we get the data from the **Provider**.
- The data we get from the provider depends on the **query** we use.
- Then we run the **steps** one by one on the incoming data to transform it.
- The transformed data is written to the output using the **writer** in the end.

We already covered **Provider** and **Writer** in the previous pages so we will cover writing **queries** and **steps** in this section.
