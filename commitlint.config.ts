module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'type-enum': [0],
    'type-empty': [0],
    'function-rules/type-enum': [
      2,
      'always',
      (parsed) => {
        switch (true) {
          case !/\d{8}/.test(parsed.type):
          case !/(none|task\d+)/.test(parsed.scope):
            return [
              false,
              `Commit format: {date}(task{id}): message. Ex: '20220412(task1000): create README.md'`,
            ];
        }
        return [true];
      },
    ],
  },
};
