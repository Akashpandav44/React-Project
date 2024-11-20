import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { JSONSchema, JSONField } from '../types/schema';
import { validateJSONSchema } from '../utils/validation';

interface JSONFormEditorProps {
  jsonSchema: JSONSchema;
}

const JSONFormEditor: React.FC<JSONFormEditorProps> = ({ jsonSchema }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState<any>({});
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log(data);
  };

  // Real-time JSON validation
  const handleJSONChange = (json: string) => {
    const parsedJSON = JSON.parse(json);
    const validationErrors = validateJSONSchema(parsedJSON);
    if (validationErrors.length > 0) {
      setErrorMessages(validationErrors.map((err: any) => err.message));
    } else {
      setErrorMessages([]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-4">
        <textarea
          onChange={(e) => handleJSONChange(e.target.value)}
          placeholder="Paste your JSON here"
          className="w-full p-2 border rounded"
        ></textarea>
        {errorMessages.length > 0 && (
          <div className="mt-2 text-red-500">
            {errorMessages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {jsonSchema.fields.map((field: JSONField) => (
            <div key={field.name} className="flex flex-col">
              <label>{field.label}</label>
              <Controller
                control={control}
                name={field.name}
                rules={{ required: field.required }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="p-2 border rounded"
                    type={field.type}
                  />
                )}
              />
              {errors[field.name] && (
                <span className="text-red-500">{field.label} is required</span>
              )}
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JSONFormEditor;
