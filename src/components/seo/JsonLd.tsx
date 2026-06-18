interface JsonLdProps {
  schema: object | object[];
}

/**
 * Renders one or more JSON-LD script tags.
 * Usage: <JsonLd schema={productSchema(...)} />
 */
export default function JsonLd({ schema }: JsonLdProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
