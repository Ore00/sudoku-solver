export const handler = async (event: any) => {
  console.log('Lambda event:', event);

  if (event.path === '/api/hello') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello from Amplify Lambda API!' }),
    };
  }

  if (event.path === '/api/users') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]),
    };
  }

  return {
    statusCode: 404,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Not Found' }),
  };
};
