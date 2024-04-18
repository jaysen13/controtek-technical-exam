const form = [
  {
    label: 'ID',
    name: 'id',
    rules: [
      {
        required: true,
        whitespace: true,
        message: "This is required"
      },
      {
        validator: (_, value) => {
          if (value === undefined)
            return Promise.reject("This is required");
          if (typeof value === "string" && value.includes(" "))
            return Promise.reject("No Spaces Allowed.");
          return Promise.resolve();
        }
      }
    ]
  },
  {
    label: 'Name',
    name: 'name',
    rules: [
      {
        required: true,
        whitespace: true,
        message: "This is required"
      }
    ]
  },
  {
    label: 'Age',
    name: 'age',
    type: 'number',
    initialValue: 0,
    rules: [
      {
        required: true,
        message: "This is required"
      },
      {
        type: 'number',
        min: 0,
        max: 100,
        message: "Invalid Age"
      }
    ],
    input_number_fields: {
      type: 'number'
    }
  },
  {
    label: 'Address',
    name: 'address',
    rules: [
      {
        required: true,
        whitespace: true,
        message: "This is required"
      }
    ]
  }
];

export default form;