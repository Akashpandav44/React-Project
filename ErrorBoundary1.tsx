import React from 'react';
import JSONFormEditor from './components/JSONFormEditor';
import { JSONSchema } from './types/schema';
import ErrorBoundary from './components/ErrorBoundary';

const schema: JSONSchema = {
  title: 'User Form',
  description: 'This is a form generated from JSON schema.',
  fields: [
    { type: 'string', label: 'Name', name: 'name', required: true },
    { type: 'number', label: 'Age', name: 'age', required: true },
  ],
};

const App: React.FC = () => (
  <ErrorBoundary>
    <JSONFormEditor jsonSchema={schema} />
  </ErrorBoundary>
);

export default App;
