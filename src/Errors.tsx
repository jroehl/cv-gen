import Ajv from 'ajv';

export function Errors({ errors }: { errors?: Ajv['errors']; }) {
  if (!errors) return null;
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Rendering failed:</h3>
      {errors.map(({ message, instancePath }) => (
        <p key={instancePath} style={{ padding: '0.25rem 3rem' }}>{`"${instancePath}" - ${message}`}</p>
      ))}
    </div>
  );
}
