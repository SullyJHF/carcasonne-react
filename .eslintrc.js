module.exports = {
  'settings': {
    'react': {
      'version': 'detect',
    },
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': './tsconfig.eslint.json',
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2020,
    'sourceType': 'module',
  },
  'plugins': [
    'import',
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'react/prop-types': 0,
    'no-plusplus': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-autofocus': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'react/jsx-props-no-spreading': 0,
    'no-continue': 0,
    'no-await-in-loop': 0,
    'no-restricted-syntax': 0,
    'no-nested-ternary': 0,
    'no-cond-assign': 0,
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'ts': 'never',
        'jsx': 'never',
        'tsx': 'never',
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'semi', // 'none' or 'semi' or 'comma'
          'requireLast': true,
        },
        'singleline': {
          'delimiter': 'semi', // 'semi' or 'comma'
          'requireLast': false,
        },
      },
    ],
    '@typescript-eslint/indent': [
      'error',
      2,
    ],
  },
};
